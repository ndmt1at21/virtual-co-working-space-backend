import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { appConfig } from '@src/config/app';
import { serverLogger } from '@components/logger';
import {
	mainAppLoaders,
	httpServerLoader,
	socketServerLoader
} from './components/app';

const startServer = async () => {
	const app = express();
	const server = http.createServer(app);

	try {
		await mainAppLoaders(app, serverLogger);

		socketServerLoader(server, serverLogger);
		httpServerLoader(server, appConfig.PORT, serverLogger);
	} catch (err) {
		serverLogger.error(err);
	}
};

startServer();
