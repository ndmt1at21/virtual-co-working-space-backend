import cors from 'cors';
import express from 'express';
import { Application } from 'express';
import helmet from 'helmet';
import { appConfig } from '@src/config/app';
import { globalErrorHandler } from '@components/globalHandlerError';
import { ILogger } from '@components/logger/@types/ILogger';
import morgan from 'morgan';

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

	app.use(morgan('combined', { stream: { write: msg => logger.info(msg) } }));

	app.use(globalErrorHandler);
};
