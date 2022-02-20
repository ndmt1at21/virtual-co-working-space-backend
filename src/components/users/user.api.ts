import { Router } from 'express';
import { UserController } from './user.controller';
import { UserCreator } from './user.creator';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserValidate } from './user.validate';

const router = Router();

const userRepository = new UserRepository();
const userValidate = UserValidate(userRepository);
const userCreator = UserCreator();
const userService = UserService(userRepository, userValidate, userCreator);
const userController = UserController(userService);

router.get('/', userController.getUsers);

router.get('/profile', userController.getProfile);

router
	.route('/:id')
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);
