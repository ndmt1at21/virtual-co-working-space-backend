import { Router } from 'express';
import { createConversationController } from './conversation.factory';

export const ConversationRouter = () => {
	const router = Router();
	const conversationController = createConversationController();

	router.get('/:id', conversationController.getConversationOfUser);

	router.get(
		'/:id/recent-messages',
		conversationController.getRecentMessagesByConversationIdAndUserId
	);
};
