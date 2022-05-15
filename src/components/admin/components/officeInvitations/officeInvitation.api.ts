import { createOfficeInvitationController } from '@src/components/officeInvitation/officeInvitation.factory';
import { Router } from 'express';

export const OfficeInvitationRouter = (): Router => {
	const router = Router();
	const officeController = createOfficeInvitationController();

	router.get('/', officeController.getOfficeInvitations);

	return router;
};
