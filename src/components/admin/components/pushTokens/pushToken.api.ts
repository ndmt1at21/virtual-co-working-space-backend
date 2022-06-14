import { createPushTokenController } from '@src/components/pushTokens/pushToken.factory';
import { Router } from 'express';

export const PushTokenRouter = () => {
	const router = Router();
	const pushTokenController = createPushTokenController();

	router.get('/', pushTokenController.getPushTokens);

	return router;
};
