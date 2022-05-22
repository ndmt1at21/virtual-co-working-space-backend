import { Router } from 'express';
import { createPushTokenController } from '../pushTokens/pushToken.factory';

export const NotificationRouter = () => {
	const router = Router();
	const pushTokenController = createPushTokenController();

	router.post('/subscribe', pushTokenController.registerPushToken);

	return router;
};
