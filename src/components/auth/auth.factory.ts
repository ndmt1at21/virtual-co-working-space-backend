import { getCustomRepository } from 'typeorm';
import { createAuthTokenService } from '@components/authToken/authToken.factory';
import { authLogger } from '@components/logger';
import { UserRepository } from '@components/users/user.repository';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { AuthValidate } from './auth.validate';

export function createAuthController() {
	const authService = createAuthService();
	const authTokenService = createAuthTokenService();
	const authController = AuthController(
		authService,
		authTokenService,
		authLogger
	);

	return authController;
}

export function createAuthService() {
	const userRepository = getCustomRepository(UserRepository);
	const authValidate = createAuthValidate();

	return AuthService(userRepository, authValidate);
}

export function createAuthMiddleware() {
	const userRepository = getCustomRepository(UserRepository);
	const authTokenService = createAuthTokenService();
	const authValidate = createAuthValidate();

	return AuthMiddleware(userRepository, authTokenService, authValidate);
}

export function createAuthValidate() {
	const userRepository = getCustomRepository(UserRepository);
	return AuthValidate(userRepository);
}
