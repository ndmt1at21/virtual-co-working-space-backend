import { Router } from 'express';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const router = Router();

const userService = UserService();
const userController = UserController(userService);

router.get('/', userController.getUsers);

router.get('/profile', userController.getProfile);

router
	.route('/:id')
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);
