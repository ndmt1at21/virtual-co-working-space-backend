import { Router } from 'express';

export const ConversationRouter = () => {
	const router = Router();
	const conversationController = createConversationController();

	router.get('/:id', conversationController.getConversationById);

	router.get(
		'/:id/recent-messages',
		conversationController.getRecentMessages
	);

	router.route('/:id').get(conversationController.getConversationById);
};
