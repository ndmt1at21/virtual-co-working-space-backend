import { ILogger } from '@src/components/logger/@types/ILogger';
import { Server } from 'socket.io';

export const socketEventHandlers = (socket: Server, logger: ILogger) => {
	logger.info('Socket event handlers has been loaded');
};
