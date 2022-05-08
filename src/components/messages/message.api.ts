import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createMessageController } from './message.factory';

export const MessageRouter = () => {
	const router = Router();
	const messageController = createMessageController();
	const authMiddleware = createAuthMiddleware();

	router.use(authMiddleware.protect);

	router
		.route('/')
		.post(messageController.createMessage)
		.patch(messageController.revokeMessage)
		.delete(messageController.deleteSelfSide);

	router.route('/read').post(messageController.markReadAll);

	router.route('/recent-messages').get(messageController.recentMessages);

	return router;
};
