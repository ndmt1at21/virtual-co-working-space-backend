import { ILogger } from '@src/components/logger/@types/ILogger';
import { OfficeMemberOverviewDto } from '@src/components/officeMembers/@types/dto/OfficeMemberOverview.dto';
import { OfficeMemberOnlineStatus } from '@src/components/officeMembers/@types/OfficeMemberOnlineStatus';
import { mapOfficeMemberToOfficeMemberOverviewDto } from '@src/components/officeMembers/officeMember.mapping';
import { OfficeMemberRepository } from '@src/components/officeMembers/officeMember.repository';
import { UpdateOfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { IOfficeMemberTransformService } from '@src/components/officeMemberTransform/@types/IOfficeMemberTransformService';
import { JoinToOfficeRoomDto } from '@src/components/offices/@types/dto/JoinToOfficeRoom.dto';
import { Server as SocketServer, Socket } from 'socket.io';
import { IOfficeMemberSocketCacheService } from './@types/IOfficeMemberSocketCacheService';
import { IOfficeMemberSocketService } from './@types/IOfficeMemberSocketService';
import { OfficeMemberClientToServerEvent } from './@types/OfficeMemberClientToServerEvent';
import { OfficeMemberServerToClientEvent } from './@types/OfficeMemberServerToClientEvent';
import { OfficeMemberSocketData } from './@types/OfficeMemberSocketData';

export const OfficeMemberSocketService = (
	socketNamespace: SocketServer,
	socket: Socket<
		OfficeMemberClientToServerEvent,
		OfficeMemberServerToClientEvent,
		any,
		OfficeMemberSocketData
	>,
	officeMemberRepository: OfficeMemberRepository,
	officeMemberTransformService: IOfficeMemberTransformService,
	officeMemberSocketCacheService: IOfficeMemberSocketCacheService,
	logger: ILogger
): IOfficeMemberSocketService => {
	async function onJoinToOfficeRoom(data: JoinToOfficeRoomDto) {
		logger.info(
			`User ${socket.user?.id} joined to office ${data.officeId}`
		);

		const { officeId } = data;
		const userId = socket.user!.id;

		const officeMember = await officeMemberRepository
			.queryBuilder()
			.findByMemberIdAndOfficeId(userId, officeId)
			.withMember()
			.withTransform()
			.build()
			.getOne();

		if (!officeMember) throw new Error('Office member not found');

		socket.data.officeMember = {
			id: officeMember.id,
			memberId: officeMember.memberId,
			officeId: officeMember.officeId
		};

		socket.join(`${officeMember!.officeId}`);
		socket.join(`user/${officeMember!.memberId}`);

		// await disconnectExistSocketHasSameUserId(userId);
		emitMemberOnlineToOffice(
			mapOfficeMemberToOfficeMemberOverviewDto(officeMember),
			officeId
		);
		setMemberInOfficeOnline(officeMember.id);

		logger.info(
			`User ${socket.user?.id} joined to office ${officeMember.officeId}`
		);
	}

	async function onMemberMove(transform: UpdateOfficeMemberTransformDto) {
		logger.info(`User ${socket.user?.id} starts update movement`);

		socket
			.to(`${socket.data.officeMember!.officeId}`)
			.emit('office_member:moved', {
				memberId: socket.user!.id,
				officeId: socket.data.officeMember!.officeId,
				...transform
			});

		logger.info(
			`User ${socket.user?.id} moved in office ${
				socket.data.officeMember!.officeId
			}`
		);

		await officeMemberTransformService.updateTransformInCacheById(
			socket.data.officeMember!.id,
			transform
		);
	}

	async function onMemberDisconnect() {
		if (socket.data.officeMember) {
			const { id, memberId } = socket.data.officeMember!;

			socket
				.to(`${socket.data.officeMember!.officeId}`)
				.emit('office_member:offline', memberId);

			setMemberInOfficeOffline(id);

			await officeMemberTransformService.backupTransformFromCacheById(id);
		}
	}

	async function disconnectExistSocketHasSameUserId(
		userId: number
	): Promise<void> {
		const socketWithSameUserId =
			await officeMemberSocketCacheService.getUserSocket(`${userId}`);

		if (!socketWithSameUserId) return;

		const existSocket =
			socketNamespace.sockets.sockets.get(socketWithSameUserId);

		existSocket?.emit('office_member:error', 'Multiple socket connection');
		existSocket?.disconnect();

		await officeMemberSocketCacheService.deleteUserSocket(`${userId}`);
	}

	async function emitMemberOnlineToOffice(
		officeMember: OfficeMemberOverviewDto,
		officeId: number
	) {
		socket.to(`${officeId}`).emit('office_member:online', officeMember);
	}

	async function setMemberInOfficeOnline(memberId: number) {
		await officeMemberRepository.setOfficeMemberOnlineStatusById(
			memberId,
			OfficeMemberOnlineStatus.ONLINE
		);
	}

	async function setMemberInOfficeOffline(memberId: number) {
		await officeMemberRepository.setOfficeMemberOnlineStatusById(
			memberId,
			OfficeMemberOnlineStatus.OFFLINE
		);
	}

	return { onJoinToOfficeRoom, onMemberDisconnect, onMemberMove };
};
