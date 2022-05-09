import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from '../users/@types/UserRoleType';
import {
	createAccessoryCategoryController,
	createAccessoryCategoryReqValidation
} from './accessoryCategory.factory';

export const AccessoryCategoryRouter = (): Router => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();
	const accessoryCategoryController = createAccessoryCategoryController();
	const accessoryCategoryReqValidation =
		createAccessoryCategoryReqValidation();

	router.use(
		authMiddleware.protect,
		authMiddleware.restrictTo([UserRoleType.ADMIN])
	);

	router
		.route('/:id')
		.get(accessoryCategoryController.getAccessoryCategoryById)
		.patch(
			accessoryCategoryReqValidation.validateUpdateAccessoryCategoryDto,
			accessoryCategoryController.updateAccessoryCategory
		);

	router
		.route('/')
		.post(
			accessoryCategoryReqValidation.validateCreateAccessoryCategoryDto,
			accessoryCategoryController.createAccessoryCategory
		)
		.get(accessoryCategoryController.getAllAccessoryCategories);

	return router;
};
