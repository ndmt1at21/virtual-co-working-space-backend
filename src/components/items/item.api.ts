import { Router } from 'express';
import { IAuthMiddleware } from '../auth/@types/IAuthMiddleware';
import { UserRoleType } from '../users/@types/UserRoleType';
import { IItemController } from './@types/IItemController';
import { IItemReqValidation } from './@types/IItemReqValidation';

export const ItemRouter = (
	itemController: IItemController,
	itemReqValidation: IItemReqValidation,
	authMiddleware: IAuthMiddleware
): Router => {
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
