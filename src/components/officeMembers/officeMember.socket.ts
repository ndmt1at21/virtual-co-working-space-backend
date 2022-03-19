import { Socket } from 'socket.io';
import { createOfficeMemberService } from './officeMember.factory';
import { OfficeMemberSocketHandler } from './officeMember.handler';

export const OfficeMemberSocket = (socket: Socket) => {
	const socketHandler = OfficeMemberSocketHandler(
		socket,
		createOfficeMemberService()
	);

	socketHandler.loadHandlers();
};
