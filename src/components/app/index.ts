import { Application } from 'express';
import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { globalErrorHandler } from '../globalHandlerError';
import { ILogger } from '../logger/@types/ILogger';
import { connectDatabase, initDatabase } from './loaders/database';
import {
	loadBackgroundJobs,
	loadServices,
	mainMiddleware,
	mainRoutes
} from './loaders/main';
import { createMessageQueues } from './loaders/queue';
import { socketEventHandlers } from './loaders/socket';
import config from '@src/config';

export const mainAppLoaders = async (
	app: Application,
	logger: ILogger
): Promise<void> => {
	await connectDatabase();
	logger.info('Database connection has been established successfully.');

	await initDatabase();
	logger.info('Database has been initialized successfully.');

	await createMessageQueues();
	logger.info('Message queues have been created successfully.');

	await loadServices();
	logger.info('Services have been loaded successfully.');

	loadBackgroundJobs();
	logger.info('Background jobs have been loaded successfully.');

	mainMiddleware(app, logger);
	logger.info('Middleware has been loaded.');

	mainRoutes(app);
	logger.info('Routes have been loaded.');

	app.use(globalErrorHandler);
	logger.info('Global error handler has been loaded.');
};

export const httpServerLoader = (
	server: HttpServer,
	port: string | number,
	logger: ILogger
): HttpServer => {
	server.listen(port, () => {
		logger.info(`Http server is listening on port ${port}`);
	});

	process.on('uncaughtException', err => {
		logger.error('UNCAUGHT EXCEPTION: ' + err.message);
		server.close(() => {
			process.exit(1);
		});
	});

	return server;
};

export const socketServerLoader = (
	server: HttpServer,
	logger: ILogger
): SocketServer => {
	const socketServer = new SocketServer(server, {
		cors: {
			origin: config.app.CORS_ORIGIN
		},
		transports: ['polling', 'websocket'],
		path: '/socket.io'
	});
	logger.info(`Socket server is initialized.`);

	socketEventHandlers(socketServer);
	logger.info(`Socket event handlers has been loaded.`);

	return socketServer;
};
