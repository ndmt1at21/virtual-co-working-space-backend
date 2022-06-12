import { ILogger } from '@src/components/logger/@types/ILogger';
import { UpdateOfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { IOfficeMemberTransformService } from '@src/components/officeMemberTransform/@types/IOfficeMemberTransformService';
import { JoinToOfficeRoomDto } from '@src/components/offices/@types/dto/JoinToOfficeRoom.dto';
import { Server as SocketServer, Socket } from 'socket.io';
import { OfficeMemberOnlineStatus } from '../@types/OfficeMemberOnlineStatus';
import { IOfficeMemberSocketCacheService } from '../@types/socket/IOfficeMemberSocketCacheService';
import { IOfficeMemberSocketService } from '../@types/socket/IOfficeMemberSocketService';
import { OfficeMemberClientToServerEvent } from '../@types/socket/OfficeMemberClientToServerEvent';
import { OfficeMemberServerToClientEvent } from '../@types/socket/OfficeMemberServerToClientEvent';
import { OfficeMemberSocketData } from '../@types/socket/OfficeMemberSocketData';
import { OfficeMemberRepository } from '../officeMember.repository';
import { OfficeMemberOverviewDto } from '../@types/dto/OfficeMemberOverview.dto';
import { mapOfficeMemberToOfficeMemberOverviewDto } from '../officeMember.mapping';

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
			`User ${socket.user?.id} start joining to office ${data.officeId}`
		);

		const { officeId } = data;
		const userId = socket.user!.id;

		const officeMember = await officeMemberRepository
			.queryBuilder()
			.findByMemberIdAndOfficeId(userId, officeId)
			.withMember()
			.withRoles()
			.withTransform()
			.build()
			.getOne();

		if (!officeMember) throw new Error('Office member not found');

		socket.data.officeMember = {
			id: officeMember.id,
			memberId: officeMember.memberId,
			officeId: officeMember.officeId
		};

		// await disconnectExistSocketHasSameUserId(userId);

		logger.info(
			`User ${socket.user?.id} is joining to room '${data.officeId}'`
		);
		socket.join(`${officeMember!.officeId}`);

		logger.info(
			`User ${socket.user?.id} is joining to room 'u/${
				officeMember!.memberId
			}'`
		);
		socket.join(`u/${officeMember!.memberId}`);
		console.log('fgkfjgjkgjkfjk');
		try {
			await officeMemberSocketCacheService.setUserSocket(
				`${userId}`,
				socket.id
			);
		} catch (err) {
			console.log(err);
		}

		console.log(mapOfficeMemberToOfficeMemberOverviewDto(officeMember));

		console.log('5656');
		emitMemberOnlineToOffice(
			mapOfficeMemberToOfficeMemberOverviewDto(officeMember),
			officeId
		);

		logger.info(
			`User ${socket.user?.id} joined to office ${officeMember.officeId}`
		);

		await officeMemberRepository.setOfficeMemberOnlineStatusById(
			officeMember.id,
			OfficeMemberOnlineStatus.ONLINE
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
			logger.info(
				`User ${socket.user?.id} is disconnecting from office ${
					socket.data.officeMember!.officeId
				}`
			);

			const { id, memberId } = socket.data.officeMember!;

			socket
				.to(`${socket.data.officeMember!.officeId}`)
				.emit('office_member:offline', memberId);

			socket.leave(`${socket.data.officeMember!.officeId}`);
			socket.leave(`u/${memberId}`);
			// remove listener

			await officeMemberRepository.setOfficeMemberOnlineStatusById(
				id,
				OfficeMemberOnlineStatus.OFFLINE
			);

			await officeMemberTransformService.backupTransformFromCacheById(id);

			logger.info(
				`User ${socket.user?.id} disconnected from office ${
					socket.data.officeMember!.officeId
				}`
			);
		}
	}

	async function disconnectExistSocketHasSameUserId(
		userId: number
	): Promise<void> {
		logger.info(
			`Start disconnecting exists sockets of user [id = ${userId}]`
		);

		const existsSocketOfUser =
			await officeMemberSocketCacheService.getUserSocket(`${userId}`);

		logger.info(
			`Start disconnecting exists socket [socketId = ${existsSocketOfUser}]`
		);

		if (!existsSocketOfUser) return;

		const existSocket =
			socketNamespace.sockets.sockets.get(existsSocketOfUser);

		existSocket?.emit('office_member:error', 'Multiple socket connection');
		existSocket?.disconnect();

		logger.info(
			`Exists socket [socketId = ${existsSocketOfUser} disconnected`
		);

		await officeMemberSocketCacheService.deleteUserSocket(`${userId}`);
	}

	async function emitMemberOnlineToOffice(
		officeMember: OfficeMemberOverviewDto,
		officeId: number
	) {
		socket.to(`${officeId}`).emit('office_member:online', officeMember);
	}

	return { onJoinToOfficeRoom, onMemberDisconnect, onMemberMove };
};
