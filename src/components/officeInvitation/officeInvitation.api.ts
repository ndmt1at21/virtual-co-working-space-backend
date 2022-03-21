import { Router } from 'express';
import { createOfficeInvitationController } from './officeInvitation.factory';

export const OfficeInvitationRouter = (): Router => {
	const router = Router();
	const officeController = createOfficeInvitationController();

	router
		.route('/:id')
		.get(officeController.getInvitation)
		.delete(officeController.deleteInvitation)
		.post(officeController.createInvitationByEmail);

	return router;
};
