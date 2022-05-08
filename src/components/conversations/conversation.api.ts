import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createConversationController } from './conversation.factory';

export const ConversationRouter = () => {
	const router = Router();
	const conversationController = createConversationController();
	const authMiddleware = createAuthMiddleware();

	router.use(authMiddleware.protect);

	router.get(
		'/:id/recent-messages',
		conversationController.getRecentMessagesByConversationIdAndUserId
	);

	router.get('/:id', conversationController.getConversationDetailOfUser);

	router
		.route('/')
		.get(conversationController.getConversationsOfUserInOffice)
		.post(conversationController.createConversationInOffice);

	return router;
};
