import { Application } from 'express';
import { appMiddleware } from './loaders/app.middleware';
import { connectDatabase } from './loaders/app.database';
import { appRoutes } from './loaders/app.routes';
import { ILogger } from '@components/logger/@types/ILogger';
import { globalErrorHandler } from '../globalHandlerError';

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

export const serverLoaders = (
	port: string | number,
	app: Application,
	logger: ILogger
) => {
	const server = app.listen(port, () => {
		logger.info(`Server is listening on port ${port}`);
	});

	process.on('uncaughtException', err => {
		logger.error('UNCAUGHT EXCEPTION: ' + err.message);
		server.close(() => {
			process.exit(1);
		});
	});
};
