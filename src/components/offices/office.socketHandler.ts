import { Server as SocketServer, Socket } from 'socket.io';
import { JoinToOfficeRoomDto } from './@types/dto/JoinToOfficeRoom.dto';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { OfficeClientToServerEvent } from './@types/OfficeClientToServerEvent';
import { OfficeServerToClientEvent } from './@types/OfficeServerToClientEvent';
import { OfficeSocketData } from './@types/OfficeSocketData';
import { createOfficeMemberSocketService } from '../officeMembers/officeMember.factory';

export const OfficeSocketHandler = (
	socketNamespace: SocketServer,
	socket: Socket<
		OfficeClientToServerEvent,
		OfficeServerToClientEvent,
		any,
		OfficeSocketData
	>
) => {
	const officeMemberSocketService = createOfficeMemberSocketService(
		socketNamespace,
		socket
	);

	socket.on('office_member:join', async data => {
		try {
			await officeMemberSocketService.onJoinToOfficeRoom(data);

			socket.on('office_member:move', transform => {
				officeMemberSocketService.onMemberMove(transform);
			});

			socket.on('office_item:create', data => {});

			socket.on('office_item:move', data => {});

			socket.on('office_item:delete', data => {});

			socket.on('disconnect', () => {
				officeMemberSocketService.onMemberDisconnect();
			});
		} catch (err) {
			socket.emit('office:error', err);
		}
	});
};
