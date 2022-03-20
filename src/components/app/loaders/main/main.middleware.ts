import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { Application } from 'express';
import { appConfig } from '@src/config/app';
import { ILogger } from '@components/logger/@types/ILogger';
import { rateLimiting } from '../../middleware/rateLimit';

export const mainMiddleware = (app: Application, logger: ILogger) => {
	const isProduction = appConfig.NODE_ENV === 'production';

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(express.static('public'));

	app.use(rateLimiting({ maxPerIp: 50, timeMs: 10000 }));

	app.use(
		helmet({
			contentSecurityPolicy: isProduction,
			crossOriginEmbedderPolicy: isProduction
		})
	);

	app.use(
		cors({
			origin: ['http://localhost:3000', 'https://vispace.tech'],
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
