import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from '../users/@types/UserRoleType';
import { createItemController } from './item.factory';

export const ItemRouter = (): Router => {
	const itemController = createItemController();
	const authMiddleware = createAuthMiddleware();

	const router = Router();

	router.use(authMiddleware.protect);

	router
		.route('/:id')
		.get(itemController.getById)
		.delete(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			itemController.deleteById
		)
		.patch(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			itemController.updateById
		);

	router
		.route('/')
		.get(itemController.getAll)
		.post(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			itemController.create
		);

	return router;
};
