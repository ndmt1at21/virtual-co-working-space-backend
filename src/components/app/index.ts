import { Application } from 'express';
import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { globalErrorHandler } from '../globalHandlerError';
import { ILogger } from '../logger/@types/ILogger';
import { connectDatabase } from './loaders/database';
import { mainMiddleware, mainRoutes } from './loaders/main';
import { socketEventHandlers, socketMiddleware } from './loaders/socket';

export const mainAppLoaders = async (
	app: Application,
	logger: ILogger
): Promise<void> => {
	await connectDatabase();
	logger.info('Database connection has been established successfully.');

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
			origin: 'https://vispace.tech, http://localhost:3000'
		}
	});
	logger.info(`Socket server is initialized.`);

	socketMiddleware(socketServer, logger);
	logger.info(`Socket middleware has been loaded.`);

	socketEventHandlers(socketServer, logger);
	logger.info(`Socket event handlers has been loaded.`);

	return socketServer;
};
