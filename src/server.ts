import 'reflect-metadata';
import { appConfig } from '@src/config/app';
import { serverLogger } from '@components/logger';
import {
	appLoaders,
	httpServerLoader,
	socketServerLoader
} from './components/app';
import express from 'express';
import http from 'http';

const startServer = async () => {
	const app = express();
	const server = http.createServer(app);

	try {
		await appLoaders(app, serverLogger);
		httpServerLoader(appConfig.PORT, server, serverLogger);
		socketServerLoader(server, serverLogger);
	} catch (err) {
		serverLogger.error(err);
	}
};

startServer();
