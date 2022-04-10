import { Router } from 'express';
import { rateLimiting } from '../app/middleware/rateLimit';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createOfficeInvitationController } from './officeInvitation.factory';

export const OfficeInvitationRouter = (): Router => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();
	const officeController = createOfficeInvitationController();

	router.use(authMiddleware.protect);

	router.post(
		'/token/:inviteToken/join',
		officeController.joinWithPrivateInvitation
	);

	router.get('/token/:inviteToken', officeController.getPrivateInvitation);

	router.post('/:inviteCode/join', officeController.joinWithPublicInvitation);

	router.get('/:inviteCode', officeController.getPublicInvitation);

	router
		.use(rateLimiting({ maxPerIp: 5, timeMs: 1000 }))
		.post('/', officeController.createOfficeInvitationByEmail);

	return router;
};
