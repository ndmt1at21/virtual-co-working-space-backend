import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from '../users/@types/UserRoleType';

export const AccessoryCategoryRouter = (): Router => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();

	router.use(
		authMiddleware.protect,
		authMiddleware.restrictTo([UserRoleType.ADMIN])
	);

	return router;
};
