import { Application } from 'express';
import { AuthRouter } from '@components/auth';

export const appRoutes = (app: Application) => {
	const API_PREFIX = '/api/v1';

	const authRouter = AuthRouter();

	app.use(`${API_PREFIX}/auth`, authRouter);
};
