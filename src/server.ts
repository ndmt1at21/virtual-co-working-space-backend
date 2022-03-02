import 'reflect-metadata';
import http from 'http';
import express from 'express';
import globalManager from './global';
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
		const socketServer = socketServerLoader(server, serverLogger);
		const httpServer = httpServerLoader(
			server,
			appConfig.PORT,
			serverLogger
		);

		globalManager.httpServer = httpServer;
		globalManager.socketServer = socketServer;
	} catch (err) {
		serverLogger.error(err);
	}
};

startServer();
