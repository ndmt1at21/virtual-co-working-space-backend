import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { OfficeRoleType } from '../officeRoles/@types/OfficeRoleType';
import { UserRoleType } from '../users/@types/UserRoleType';
import {
	createOfficeController,
	createOfficeMiddleware,
	createOfficeReqValidation
} from './office.factory';

export const OfficeRouter = () => {
	const officeController = createOfficeController();
	const officeMiddleware = createOfficeMiddleware();
	const authMiddleware = createAuthMiddleware();
	const officeReqValidation = createOfficeReqValidation();

	const router = Router();

	router.use(authMiddleware.protect, authMiddleware.restrictToEmailVerified);

	router
		.route('/in-offices')
		.get(officeController.getAllOfficesOverviewCurrentUserIsMember);

	router.route('/roles').get(officeController.getAllOfficeRoles);

	router.use(
		'/:id',
		officeMiddleware.protect,
		officeMiddleware.restrictToNotBlockedOffice,
		officeMiddleware.restrictToNotBlockedMember
	);

	router
		.route('/:id/members/roles')
		.all(
			officeMiddleware.restrictTo([
				OfficeRoleType.ADMIN,
				OfficeRoleType.OWNER
			])
		)
		.post(officeController.addRoleToOfficeMember)
		.delete(officeController.removeRoleFromOfficeMember);

	router
		.route('/:id/members/:memberId')
		.delete(
			officeMiddleware.restrictTo([OfficeRoleType.OWNER]),
			officeController.removeMemberFromOffice
		);

	router.route('/:id/members').get(officeController.getOfficeMembersById);

	router.route('/:id/items').get(officeController.getOfficeItemsById);

	router
		.route('/:id/appearances')
		.get(officeController.getAllAppearancesInOffice);

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
			officeReqValidation.validateUpdateOffice,
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
		.post(
			officeReqValidation.validateCreateOffice,
			officeController.createOffice
		);

	return router;
};
