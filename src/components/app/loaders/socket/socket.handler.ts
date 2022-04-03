import { createSocketMiddleware } from '@src/components/authSocket/authSocket.factory';
import { createOfficeSocketHandler } from '@src/components/offices/office.factory';
import { Server } from 'socket.io';

export const socketEventHandlers = (socketServer: Server) => {
	const socketAuthMiddleware = createSocketMiddleware();

	// TODO: use auth middleware to protect all socket events
	socketServer.use(socketAuthMiddleware.protect);

	socketServer.on('connection', socket => {
		createOfficeSocketHandler(socketServer, socket);
	});
};
