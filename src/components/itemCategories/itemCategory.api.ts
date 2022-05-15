import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from '../users/@types/UserRoleType';
import {
	createItemCategoryController,
	createItemCategoryReqValidation
} from './itemCategory.factory';

export const ItemCategoryRouter = (): Router => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();
	const itemCategoryController = createItemCategoryController();
	const itemCategoryReqValidation = createItemCategoryReqValidation();

	router.use(authMiddleware.protect);

	router
		.route('/:id')
		.get(itemCategoryController.getItemCategoryById)
		.patch(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			itemCategoryReqValidation.validateUpdateItemCategoryDto,
			itemCategoryController.updateItemCategory
		);

	router
		.route('/')
		.post(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			itemCategoryReqValidation.validateCreateItemCategoryDto,
			itemCategoryController.createItemCategory
		)
		.get(itemCategoryController.getAllItemCategories);

	return router;
};
