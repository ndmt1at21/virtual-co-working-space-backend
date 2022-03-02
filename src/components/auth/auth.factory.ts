import { getCustomRepository } from 'typeorm';
import { createAuthTokenService } from '@components/authToken/authToken.factory';
import { authLogger } from '@components/logger';
import { UserRepository } from '@components/users/user.repository';
import { createUserService } from '@components/users/user.factory';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { AuthValidate } from './auth.validate';
import { createPasswordResetTokenService } from '../passwordResetToken/passwordResetToken.factory';
import { createActiveUserTokenService } from '../activeUserToken/activeUserToken.factory';

export function createAuthController() {
	const authService = createAuthService();
	const authController = AuthController(authService, authLogger);

	return authController;
}

export function createAuthService() {
	const userService = createUserService();
	const passwordResetTokenService = createPasswordResetTokenService();
	const authTokenService = createAuthTokenService();
	const activeUserTokenService = createActiveUserTokenService();
	const authValidate = createAuthValidate();

	return AuthService(
		userService,
		authTokenService,
		passwordResetTokenService,
		activeUserTokenService,
		authValidate
	);
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
