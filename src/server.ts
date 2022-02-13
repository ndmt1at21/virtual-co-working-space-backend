import 'reflect-metadata';
import { appConfig } from '@src/config/app';
import { consoleLogger, serverLogger } from 'logger';
import { appLoaders, serverLoaders } from './loaders';
import express from 'express';

const startServer = async () => {
	const app = express();

	const isProduction = appConfig.NODE_ENV === 'production';
	const logger = isProduction ? serverLogger : consoleLogger;

	try {
		await appLoaders(app, logger);
		serverLoaders(appConfig.PORT, app, logger);
	} catch (err) {
		logger.error(err);
	}
};

startServer();
