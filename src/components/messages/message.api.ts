import { Router } from 'express';
import { createMessageController } from './message.factory';

export const MessageRouter = () => {
	const router = Router();
	const messageController = createMessageController();

	router.get('/:id', messageController.getMessage);

	router.get('/', messageController.getMessages);
};
