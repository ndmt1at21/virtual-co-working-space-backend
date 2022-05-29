import { createSocketMiddleware } from '@src/components/authSocket/authSocket.factory';
import { createOfficeSocketHandler } from '@src/components/offices/office.factory';
import { createCallingSocketHandler } from '@components/calling/calling.factory';
import { Server } from 'socket.io';
import { ILogger } from '@components/logger/@types/ILogger';

export const socketEventHandlers = (socketServer: Server, logger: ILogger) => {
	const socketAuthMiddleware = createSocketMiddleware(logger);

	// TODO: use auth middleware to protect all socket events
	socketServer.use(socketAuthMiddleware.protect);

	socketServer.on('connection', socket => {
		createOfficeSocketHandler(socketServer, socket);
		createCallingSocketHandler(socketServer, socket);
	});
};
