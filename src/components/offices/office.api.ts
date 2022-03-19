import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createOfficeController } from './office.factory';

export const OfficeRouter = () => {
	const officeController = createOfficeController();
	const { protect } = createAuthMiddleware();

	const router = Router();

	router.use(protect);

	router.route('/:id/members').get(officeController.getOfficeMembersById);

	router.route('/:id/items').get(officeController.getOfficeItemsById);

	router
		.route('/:id')
		.get(officeController.getOfficeDetailById)
		.delete(officeController.deleteOfficeById)
		.patch(officeController.updateOfficeById);

	router
		.route('/')
		.get(officeController.getAllOfficesOverviewCurrentUserIsMember)
		.post(officeController.createOffice)
		.patch(officeController.updateOfficeById);

	return router;
};
