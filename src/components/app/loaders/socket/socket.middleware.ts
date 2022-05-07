import { createSocketMiddleware } from '@src/components/authSocket/authSocket.factory';
import { ILogger } from '@src/components/logger/@types/ILogger';
import { Server } from 'socket.io';

export const socketMiddleware = (server: Server, logger: ILogger) => {
	const authMiddleware = createSocketMiddleware(logger);
	server.use(authMiddleware.protect);
};
