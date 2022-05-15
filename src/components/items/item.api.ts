import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from '../users/@types/UserRoleType';
import { createItemController, createItemReqValidation } from './item.factory';

export const ItemRouter = (): Router => {
	const itemController = createItemController();
	const itemReqValidation = createItemReqValidation();
	const authMiddleware = createAuthMiddleware();

	const router = Router();

	router.use(authMiddleware.protect);

	router
		.route('/:id')
		.all(itemReqValidation.validateItemId)
		.get(itemController.getById)
		.patch(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			itemReqValidation.validateUpdateItemData,
			itemController.updateById
		)
		.delete(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			itemController.deleteById
		);

	router
		.route('/')
		.get(itemController.getAll)
		.post(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			itemReqValidation.validateCreateItemData,
			itemController.create
		);

	return router;
};
