import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from '../users/@types/UserRoleType';
import { createOfficeController } from './office.factory';

export const OfficeRouter = () => {
	const officeController = createOfficeController();
	const { protect, restrictTo } = createAuthMiddleware();

	const router = Router();

	router.use(protect);

	router.route('/:id/members').get(officeController.getOfficeMembersById);

	router.route('/:id/items').get(officeController.getOfficeItemsById);

	router
		.route('/in-offices')
		.get(officeController.getAllOfficesOverviewCurrentUserIsMember);

	router
		.route('/:id')
		.get(officeController.getOfficeDetailById)
		.delete(officeController.deleteOfficeById)
		.patch(officeController.updateOfficeById);

	router
		.route('/')
		.get(restrictTo([UserRoleType.ADMIN]), officeController.getAllOffices)
		.post(officeController.createOffice)
		.patch(officeController.updateOfficeById);

	return router;
};
