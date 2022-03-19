import { Application } from 'express';
import { AuthRouter } from '@components/auth';
import { UserRouter } from '@src/components/users';
import { ItemRouter } from '@src/components/items';
import { OfficeRouter } from '@src/components/offices';
import { OfficeItemRouter } from '@src/components/officeItems';
import { OfficeMemberRouter } from '@src/components/officeMembers';

export const mainRoutes = (app: Application) => {
	const API_PREFIX = '/api/v1';

	const authRouter = AuthRouter();
	const userRouter = UserRouter();
	const itemRouter = ItemRouter();
	const officeRouter = OfficeRouter();
	const officeItemRouter = OfficeItemRouter();
	const officeMemberRouter = OfficeMemberRouter();

	app.use(`${API_PREFIX}/auth`, authRouter);
	app.use(`${API_PREFIX}/users`, userRouter);
	app.use(`${API_PREFIX}/items`, itemRouter);
	app.use(`${API_PREFIX}/offices`, officeRouter);
	app.use(`${API_PREFIX}/office-items`, officeItemRouter);
	app.use(`${API_PREFIX}/office-members`, officeMemberRouter);
};
