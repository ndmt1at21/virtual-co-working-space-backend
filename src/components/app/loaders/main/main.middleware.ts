import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { Application } from 'express';
import { appConfig } from '@src/config/app';
import { ILogger } from '@components/logger/@types/ILogger';
import { rateLimiting } from '../../middleware/rateLimit';
import config from '@src/config';

export const mainMiddleware = (app: Application, logger: ILogger) => {
	const isProduction = appConfig.NODE_ENV === 'production';

	app.enable('trust proxy');

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(express.static('public'));

	app.use(rateLimiting({ maxPerIp: 20, timeMs: 1000 }));

	app.use(
		helmet({
			contentSecurityPolicy: isProduction,
			crossOriginEmbedderPolicy: isProduction
		})
	);

	app.use(
		cors({
			origin: config.app.CORS_ORIGIN,
			credentials: true,
			exposedHeaders: [
				'x-total-count',
				'x-refresh-token',
				'x-access-token'
			]
		})
	);

	app.use(
		morgan(
			':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
			{ stream: { write: msg => logger.info(msg) } }
		)
	);
};
