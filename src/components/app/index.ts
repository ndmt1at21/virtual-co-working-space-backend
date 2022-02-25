import { Application } from 'express';
import { appMiddleware } from './loaders/app.middleware';
import { connectDatabase } from './loaders/app.database';
import { appRoutes } from './loaders/app.routes';
import { ILogger } from '@components/logger/@types/ILogger';
import { globalErrorHandler } from '../globalHandlerError';
import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

export const appLoaders = async (
	app: Application,
	logger: ILogger
): Promise<void> => {
	await connectDatabase();
	logger.info('Database connection has been established successfully.');

	appMiddleware(app, logger);
	logger.info('Middleware has been loaded.');

	appRoutes(app);
	logger.info('Routes have been loaded.');

	app.use(globalErrorHandler);
	logger.info('Global error handler has been loaded.');
};

export const httpServerLoader = (
	port: string | number,
	server: HttpServer,
	logger: ILogger
) => {
	server.listen(port, () => {
		logger.info(`Http server is listening on port ${port}`);
	});

	process.on('uncaughtException', err => {
		logger.error('UNCAUGHT EXCEPTION: ' + err.message);
		server.close(() => {
			process.exit(1);
		});
	});
};

export const socketServerLoader = (
	server: HttpServer,
	logger: ILogger
): SocketServer => {
	const socketServer = new SocketServer(server);
	logger.info(`Socket server is started`);
	return socketServer;
};
