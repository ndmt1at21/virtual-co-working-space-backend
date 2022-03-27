import { Server as SocketServer, Socket } from 'socket.io';
import { UpdateOfficeMemberTransformDto } from '../officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { IOfficeMemberTransformService } from '../officeMemberTransform/@types/IOfficeMemberTransformService';
import { JoinToOfficeRoomDto } from './@types/dto/JoinToOfficeRoom.dto';
import { IOfficeMemberCacheService } from './@types/IOfficeMemberCacheService';
import { OfficeMemberClientToServerEvent } from './@types/OfficeMemberClientToServerEvent';
import { OfficeMemberOnlineStatus } from './@types/OfficeMemberOnlineStatus';
import { OfficeMemberServerToClientEvent } from './@types/OfficeMemberServerToClientEvent';
import { OfficeMemberSocketData } from './@types/OfficeMemberSocketData';
import { OfficeMemberRepository } from './officeMember.repository';

export const OfficeMemberSocketHandler = (
	socketNamespace: SocketServer,
	socket: Socket<
		OfficeMemberClientToServerEvent,
		OfficeMemberServerToClientEvent,
		any,
		OfficeMemberSocketData
	>,
	officeMemberRepository: OfficeMemberRepository,
	officeMemberTransformService: IOfficeMemberTransformService,
	officeMemberCacheService: IOfficeMemberCacheService
) => {
	socket.on('office_member:join', (data: JoinToOfficeRoomDto) => {
		onJoinToOfficeRoom(data);

		socket.on('office_member:move', onMemberMove);
		socket.on('disconnect', onMemberDisconnect);
	});

	async function onJoinToOfficeRoom(data: JoinToOfficeRoomDto) {
		const { officeId } = data;
		const userId = socket.user!.id;

		try {
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

			await disconnectExistSocketHasSameUserId(userId);
			emitMemberOnlineToOffice(officeMember.memberId, officeId);
			setMemberInOfficeOnline(officeMember.memberId);
		} catch (err: any) {
			socket.emit('office_member:error', err);
			socket.disconnect();
		}
	}

	async function onMemberMove(transform: UpdateOfficeMemberTransformDto) {
		try {
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
		} catch (err: any) {
			socket.emit('office_member:error', err);
		}
	}

	async function onMemberDisconnect() {
		const { id, memberId } = socket.data.officeMember!;

		try {
			socket
				.to(`${socket.data.officeMember!.officeId}`)
				.emit('office_member:offline', memberId);

			setMemberInOfficeOffline(id);

			await officeMemberTransformService.backupTransformFromCacheById(id);
		} catch (err: any) {
			socket.emit('office_member:error', err);
		}
	}

	async function disconnectExistSocketHasSameUserId(
		userId: number
	): Promise<void> {
		const socketWithSameUserId =
			await officeMemberCacheService.getUserSocket(`${userId}`);

		if (!socketWithSameUserId) return;

		const existSocket =
			socketNamespace.sockets.sockets.get(socketWithSameUserId);

		existSocket?.emit('office_member:error', 'Multiple socket connection');
		existSocket?.disconnect();

		await officeMemberCacheService.deleteUserSocket(`${userId}`);
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
};
