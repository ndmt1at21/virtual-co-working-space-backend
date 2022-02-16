import { Application } from 'express';
import { appMiddleware } from './loaders/app.middleware';
import { connectDatabase } from './loaders/app.database';
import { appRoutes } from './loaders/app.routes';
import { ILogger } from '@src/@types/ILogger';

export const appLoaders = async (
	app: Application,
	logger: ILogger
): Promise<void> => {
	await connectDatabase();
	logger.info('Database connection has been established successfully.');

	appMiddleware(app);
	logger.info('Middleware has been loaded.');

	appRoutes();
	logger.info('Routes have been loaded.');
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
