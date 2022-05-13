import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { UserRoleType } from './@types/UserRoleType';
import { UserController } from './user.controller';
import { createUserController, createUserService } from './user.factory';

export const UserRouter = (): Router => {
	const router = Router();

	const authMiddleware = createAuthMiddleware();
	const userController = createUserController();

	router.use('/', authMiddleware.protect);

	router
		.route('/me/profile')
		.get(userController.getProfile)
		.patch(userController.updateProfile);

	router
		.route('/:id/block')
		.patch(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			userController.blockUser
		);

	router
		.route('/:id/unblock')
		.patch(
			authMiddleware.restrictTo([UserRoleType.ADMIN]),
			userController.unblockUser
		);

	router
		.route('/:id')
		// .all(authMiddleware.restrictTo([UserRoleType.ADMIN]))
		.get(userController.getUserById)
		.patch(userController.updateUser)
		.delete(userController.deleteUser);

	router
		.route('/')
		// .all(authMiddleware.restrictTo([UserRoleType.ADMIN]))
		.post(userController.createUser)
		.get(userController.getUsers);

	return router;
};
