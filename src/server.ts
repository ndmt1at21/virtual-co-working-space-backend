import 'reflect-metadata';
import http from 'http';
import path from 'path';
import express from 'express';

global.__basedir = path.resolve('./');

import { appConfig } from '@src/config/app';
import { serverLogger } from '@components/logger';
import {
	mainAppLoaders,
	httpServerLoader,
	socketServerLoader,
	peerServerLoader
} from './components/app';

global.__basedir = path.resolve('./');

const startServer = async () => {
	const app = express();
	const server = http.createServer(app);

	try {
		await mainAppLoaders(app, serverLogger);
		socketServerLoader(server, serverLogger);
		httpServerLoader(server, appConfig.PORT, serverLogger);
		peerServerLoader(server, app);
	} catch (err) {
		serverLogger.error(err);
	}
};

startServer();
