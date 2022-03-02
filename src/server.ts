import 'reflect-metadata';
import { appConfig } from '@src/config/app';
import { serverLogger } from '@components/logger';
import {
	mainAppLoaders,
	httpServerLoader,
	socketServerLoader
} from './components/app';
import express from 'express';
import http from 'http';

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
