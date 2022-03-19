import { Router } from 'express';
import { createOfficeInvitationController } from './officeInvitation.factory';

export const OfficeInvitationRouter = (): Router => {
	const router = Router();
	const officeController = createOfficeInvitationController();

	router
		.route('/')
		.get(officeController.acceptInvitationByToken)
		.delete(officeController.deleteInvitation)
		.post(officeController.createInvitationByEmail);

	return router;
};
