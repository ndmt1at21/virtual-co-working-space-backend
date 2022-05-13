import { getCustomRepository } from 'typeorm';
import { PasswordEncoder } from './components/passwordEncoder';
import { UserController } from './user.controller';
import { UserCreator } from './user.creator';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserValidate } from './user.validate';

export function createUserController() {
	const userService = createUserService();
	return new UserController(userService);
}

export function createUserService() {
	const userRepository = createUserRepository();
	const userValidate = createUserValidate();
	const userCreator = createUserCreator();
	const passwordEncoder = PasswordEncoder();

	return new UserService(
		userRepository,
		userValidate,
		userCreator,
		passwordEncoder
	);
}

export function createUserCreator() {
	return new UserCreator(createUserRepository());
}

export function createUserValidate() {
	const userRepository = createUserRepository();
	return new UserValidate(userRepository);
}

export function createUserRepository() {
	return getCustomRepository(UserRepository);
}
