import { createUserController } from '@src/components/users/user.factory';
import { Router } from 'express';

export const UserRouter = (): Router => {
	const router = Router();

	const userController = createUserController();

	router.route('/:id/block').patch(userController.blockUser);

	router.route('/:id/unblock').patch(userController.unblockUser);

	router
		.route('/:id')
		.get(userController.getUserById)
		.delete(userController.deleteUser);

	router
		.route('/')
		.post(userController.createUser)
		.get(userController.getUsers);

	return router;
};
