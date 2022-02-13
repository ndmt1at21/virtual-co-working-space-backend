import cors from 'cors';
import express from 'express';
import { Application } from 'express';
import helmet from 'helmet';
import { appConfig } from '@src/config/app';

export const appMiddleware = (app: Application) => {
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
			exposedHeaders: ['x-total-count']
		})
	);
};
