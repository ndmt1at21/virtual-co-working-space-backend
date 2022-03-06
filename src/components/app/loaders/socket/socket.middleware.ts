import { createSocketMiddleware } from '@src/components/authSocket/authSocket.factory';
import { ILogger } from '@src/components/logger/@types/ILogger';
import { Server } from 'socket.io';

const authMiddleware = createSocketMiddleware();

export const socketMiddleware = (server: Server, logger: ILogger) => {
	server.use(authMiddleware.protect);
};
