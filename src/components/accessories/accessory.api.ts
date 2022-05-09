import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from '../users/@types/UserRoleType';
import {
	createAccessoryController,
	createAccessoryReqValidation
} from './accessory.factory';

export const AccessoryRouter = (): Router => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();
	const accessoryController = createAccessoryController();
	const reqValidation = createAccessoryReqValidation();

	router.use(authMiddleware.protect);

	router
		.route('/')
		.post(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			reqValidation.validateCreateAccessory,
			accessoryController.createAccessory
		)
		.get(accessoryController.getAllAccessories);

	router
		.route('/:id')
		.get(accessoryController.getAccessoryById)
		.patch(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			reqValidation.validateUpdateAccessory,
			accessoryController.updateAccessory
		)
		.delete(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			accessoryController.deleteAccessory
		);

	return router;
};
