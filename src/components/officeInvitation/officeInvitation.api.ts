import { Router } from 'express';
import { createOfficeInvitationController } from './officeInvitation.factory';

export const OfficeInvitationRouter = (): Router => {
	const router = Router();
	const officeController = createOfficeInvitationController();

	router.post('/', officeController.createInvitationByEmail);

	router.post(
		'/token/:inviteToken/accept',
		officeController.acceptInvitationByInviteToken
	);

	router.post(
		'/:inviteCode/accept',
		officeController.acceptInvitationByInviteCode
	);

	router.get(
		'/token/:inviteToken',
		officeController.findInvitationByInviteToken
	);

	router.get('/:inviteCode', officeController.getInvitationByInviteCode);

	return router;
};
