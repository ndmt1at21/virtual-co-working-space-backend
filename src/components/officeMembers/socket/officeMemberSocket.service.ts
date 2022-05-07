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
	officeMemberSocketCacheService: IOfficeMemberSocketCacheService
): IOfficeMemberSocketService => {
	async function onJoinToOfficeRoom(data: JoinToOfficeRoomDto) {
		const { officeId } = data;
		const userId = socket.user!.id;

		const officeMember = await officeMemberRepository
			.queryBuilder()
			.findByMemberIdAndOfficeId(userId, officeId)
			.build()
			.getOne();

		if (!officeMember) throw new Error('Office member not found');

		socket.data.officeMember = {
			id: officeMember.id,
			memberId: officeMember.memberId,
			officeId: officeMember.officeId
		};

		socket.join(`${officeMember!.officeId}`);

		// await disconnectExistSocketHasSameUserId(userId);
		emitMemberOnlineToOffice(officeMember.memberId, officeId);
		setMemberInOfficeOnline(officeMember.memberId);
	}

	async function onMemberMove(transform: UpdateOfficeMemberTransformDto) {
		socket
			.to(`${socket.data.officeMember!.officeId}`)
			.emit('office_member:moved', {
				memberId: socket.user!.id,
				officeId: socket.data.officeMember!.officeId,
				...transform
			});

		await officeMemberTransformService.updateTransformInCacheById(
			socket.data.officeMember!.id,
			transform
		);
	}

	async function onMemberDisconnect() {
		const { id, memberId } = socket.data.officeMember!;

		socket
			.to(`${socket.data.officeMember!.officeId}`)
			.emit('office_member:offline', memberId);
		
		setMemberInOfficeOffline(id);

		await officeMemberTransformService.backupTransformFromCacheById(id);
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
		memberId: number,
		officeId: number
	) {
		socket.to(`${officeId}`).emit('office_member:online', memberId);
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
