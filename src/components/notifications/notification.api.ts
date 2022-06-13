import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createPushTokenController } from '../pushTokens/pushToken.factory';
import { createNotificationController } from './notification.factory';

export const NotificationRouter = (): Router => {
	const router = Router();

	const notificationController = createNotificationController();
	const pushTokenController = createPushTokenController();
	const authMiddleware = createAuthMiddleware();

	router.use(authMiddleware.protect);

	router.post('/subscribe', pushTokenController.registerPushToken);
	router.post('/unsubscribe');

	router
		.route('/')
		.get(notificationController.getNotificationsOfUser)
		.post(notificationController.createNotification); // just for testing

	return router;
};
