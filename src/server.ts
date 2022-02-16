import 'reflect-metadata';
import { appConfig } from '@src/config/app';
import { serverLogger } from '@components/logger';
import { appLoaders, serverLoaders } from './components/app';
import express from 'express';

const startServer = async () => {
	const app = express();

	try {
		await appLoaders(app, serverLogger);
		serverLoaders(appConfig.PORT, app, serverLogger);
	} catch (err) {
		serverLogger.error(err);
	}
};

startServer();
