import { createSocketMiddleware } from '@src/components/authSocket/authSocket.factory';
import { ILogger } from '@src/components/logger/@types/ILogger';
import { createOfficeMemberSocketHandler } from '@src/components/officeMembers/officeMember.factory';
import { OfficeMemberSocketHandler } from '@src/components/officeMembers/officeMember.socketHandler';
import { Server } from 'socket.io';

export const socketEventHandlers = (socketServer: Server) => {
	const socketAuthMiddleware = createSocketMiddleware();

	// TODO: use auth middleware to protect all socket events
	socketServer.use(socketAuthMiddleware.protect);

	socketServer.on('connection', socket => {
		createOfficeMemberSocketHandler(socketServer, socket);
	});
};
