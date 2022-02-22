import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express, { Router } from 'express';
import { Application } from 'express';
import { appConfig } from '@src/config/app';
import { ILogger } from '@components/logger/@types/ILogger';
import { createAuthMiddleware } from '@src/components/auth/auth.factory';

export const appMiddleware = (app: Application, logger: ILogger) => {
	const isProduction = appConfig.NODE_ENV === 'production';

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(
		helmet({
			contentSecurityPolicy: isProduction,
			crossOriginEmbedderPolicy: isProduction
		})
	);

	app.use(
		cors({
			origin: '*',
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

	const authMiddleware = createAuthMiddleware();
	app.use(authMiddleware.deserializeUser);
};
