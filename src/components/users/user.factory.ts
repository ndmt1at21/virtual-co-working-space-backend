import { getCustomRepository } from 'typeorm';
import { PasswordEncoder } from '../passwordEncoder';
import { UserCreator } from './user.creator';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserValidate } from './user.validate';

export function createUserService() {
	const userRepository = getCustomRepository(UserRepository);
	const userValidate = createUserValidate();
	const userCreator = createUserCreator();
	const passwordEncoder = PasswordEncoder();

	return UserService(
		userRepository,
		userValidate,
		userCreator,
		passwordEncoder
	);
}

export function createUserCreator() {
	return UserCreator();
}

export function createUserValidate() {
	const userRepository = getCustomRepository(UserRepository);
	return UserValidate(userRepository);
}
