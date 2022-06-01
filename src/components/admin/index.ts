import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from '../users/@types/UserRoleType';
import { ItemCategoryRouter } from './components/itemCategories/itemCategories.api';
import { OfficeMemberRouter } from './components/officeMembers/officeMember.api';
import { ItemRouter } from './components/items/item.api';
import { OfficeInvitationRouter } from './components/officeInvitations/officeInvitation.api';
import { OfficeItemRouter } from './components/officeItems/officeItem.api';
import { OfficeRouter } from './components/offices/office.api';
import { UserRouter } from './components/users/user.api';

export const AdminRouter = () => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();

	router.use(
		authMiddleware.protect,
		authMiddleware.restrictTo([UserRoleType.ADMIN])
	);

	const userRouter = UserRouter();
	const itemRouter = ItemRouter();
	const officeRouter = OfficeRouter();
	const officeItemRouter = OfficeItemRouter();
	const officeMemberRouter = OfficeMemberRouter();
	const officeInvitationRouter = OfficeInvitationRouter();
	const itemCategoryRouter = ItemCategoryRouter();

	router.use(`/users`, userRouter);
	router.use(`/items`, itemRouter);
	router.use(`/offices`, officeRouter);
	router.use(`/office-items`, officeItemRouter);
	router.use(`/office-members`, officeMemberRouter);
	router.use(`/invites`, officeInvitationRouter);
	router.use(`/item-categories`, itemCategoryRouter);

	return router;
};
