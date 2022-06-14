import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createPushTokenController } from '../pushTokens/pushToken.factory';
import { UserRoleType } from '../users/@types/UserRoleType';
import { createNotificationController } from './notification.factory';

export const NotificationRouter = (): Router => {
	const router = Router();

	const notificationController = createNotificationController();
	const pushTokenController = createPushTokenController();
	const authMiddleware = createAuthMiddleware();

	router.post(
		'/subscribe',
		authMiddleware.protect,
		pushTokenController.registerPushToken
	);

	router.post('/unsubscribe', pushTokenController.unregisterPushToken);

	router
		.route('/')
		.all(authMiddleware.protect)
		.get(notificationController.getNotificationsOfUser)
		.post(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			notificationController.createNotification
		); // just for testing

	return router;
};
