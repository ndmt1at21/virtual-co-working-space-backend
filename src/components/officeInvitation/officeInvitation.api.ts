import { Router } from 'express';
import { rateLimiting } from '../app/middleware/rateLimit';
import { createAuthMiddleware } from '../auth/auth.factory';
import {
	createOfficeInvitationController,
	createOfficeInvitationReqValidation
} from './officeInvitation.factory';

export const OfficeInvitationRouter = (): Router => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();
	const officeController = createOfficeInvitationController();
	const officeInvitationReqValidation = createOfficeInvitationReqValidation();

	router.use(authMiddleware.protect, authMiddleware.restrictToEmailVerified);

	router.post(
		'/token/:inviteToken/join',
		officeController.joinWithPrivateInvitation
	);

	router.get('/token/:inviteToken', officeController.getPrivateInvitation);

	router.post('/:inviteCode/join', officeController.joinWithPublicInvitation);

	router.get('/:inviteCode', officeController.getPublicInvitation);

	router
		.use(rateLimiting({ maxPerIp: 5, timeMs: 1000 }))
		.post(
			'/',
			officeInvitationReqValidation.validateCreatePrivateOfficeInvitation,
			officeController.createOfficeInvitationByEmail
		);

	return router;
};
