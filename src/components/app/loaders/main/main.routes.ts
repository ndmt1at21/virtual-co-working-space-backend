import { Application } from 'express';
import { AuthRouter } from '@components/auth';
import { UserRouter } from '@src/components/users';
import { ItemRouter } from '@src/components/items';
import { OfficeRouter } from '@src/components/offices';
import { OfficeItemRouter } from '@src/components/officeItems';
import { OfficeMemberRouter } from '@src/components/officeMembers';
import { CloudUploadRouter } from '@src/components/cloudUpload/cloudUpload.api';
import { OfficeInvitationRouter } from '@src/components/officeInvitation/officeInvitation.api';
import { MessageRouter } from '@src/components/messages/message.api';
import { ConversationRouter } from '@src/components/conversations/conversation.api';
import { ItemCategoryRouter } from '@src/components/itemCategories/itemCategory.api';
import { AppearanceRouter } from '@src/components/appearances/appearance.api';

export const mainRoutes = (app: Application) => {
	const API_PREFIX = '/api/v1';

	const authRouter = AuthRouter();
	const userRouter = UserRouter();
	const itemRouter = ItemRouter();
	const officeRouter = OfficeRouter();
	const officeItemRouter = OfficeItemRouter();
	const officeMemberRouter = OfficeMemberRouter();
	const cloudUploadRouter = CloudUploadRouter();
	const officeInvitationRouter = OfficeInvitationRouter();
	const messageRouter = MessageRouter();
	const conversationRouter = ConversationRouter();
	const appearanceRouter = AppearanceRouter();
	const itemCategoryRouter = ItemCategoryRouter();

	app.use(`${API_PREFIX}/auth`, authRouter);
	app.use(`${API_PREFIX}/users`, userRouter);
	app.use(`${API_PREFIX}/items`, itemRouter);
	app.use(`${API_PREFIX}/offices`, officeRouter);
	app.use(`${API_PREFIX}/office-items`, officeItemRouter);
	app.use(`${API_PREFIX}/office-members`, officeMemberRouter);
	app.use(`${API_PREFIX}/uploads`, cloudUploadRouter);
	app.use(`${API_PREFIX}/invites`, officeInvitationRouter);
	app.use(`${API_PREFIX}/messages`, messageRouter);
	app.use(`${API_PREFIX}/conversations`, conversationRouter);
	app.use(`${API_PREFIX}/appearances`, appearanceRouter);
	app.use(`${API_PREFIX}/item-categories`, itemCategoryRouter);
};
