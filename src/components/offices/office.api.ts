import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { OfficeRoleType } from '../officeRoles/@types/OfficeRoleType';
import { UserRoleType } from '../users/@types/UserRoleType';
import {
	createOfficeController,
	createOfficeMiddleware
} from './office.factory';

export const OfficeRouter = () => {
	const officeController = createOfficeController();
	const officeMiddleware = createOfficeMiddleware();
	const authMiddleware = createAuthMiddleware();

	const router = Router();

	router.use(authMiddleware.protect);

	router
		.route('/in-offices')
		.get(officeController.getAllOfficesOverviewCurrentUserIsMember);

	router.use(
		'/:id',
		officeMiddleware.protect,
		officeMiddleware.restrictToNotBlockedOffice
	);

	router.route('/:id/members').get(officeController.getOfficeMembersById);

	router.route('/:id/items').get(officeController.getOfficeItemsById);

	router
		.route('/:id/conversations')
		.get(officeController.getConversationOfUserInOfficeByOfficeId);

	router
		.route('/:id/block')
		.delete(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			officeController.blockOfficeById
		);

	router
		.route('/:id')
		.get(officeController.getOfficeDetailById)
		.delete(
			officeMiddleware.restrictTo([OfficeRoleType.OWNER]),
			officeController.deleteOfficeById
		)
		.patch(
			officeMiddleware.restrictTo([
				OfficeRoleType.OWNER,
				OfficeRoleType.ADMIN
			]),
			officeController.updateOfficeById
		);

	router
		.route('/')
		.get(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			officeController.getAllOffices
		)
		.post(officeController.createOffice);

	return router;
};
