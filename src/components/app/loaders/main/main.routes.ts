import { Application } from 'express';
import { AuthRouter } from '@components/auth';
import { UserRouter } from '@src/components/users';
import { ItemRouter } from '@src/components/items';

export const mainRoutes = (app: Application) => {
	const API_PREFIX = '/api/v1';

	const authRouter = AuthRouter();
	const userRouter = UserRouter();
	const itemRouter = ItemRouter();

	app.use(`${API_PREFIX}/auth`, authRouter);
	app.use(`${API_PREFIX}/users`, userRouter);
	app.use(`${API_PREFIX}/items`, itemRouter);
};
