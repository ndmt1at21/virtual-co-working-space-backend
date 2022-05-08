import { createAuthTokenService } from '@src/components/auth/components/authToken/authToken.factory';
import { authLogger } from '@components/logger';
import {
	createUserRepository,
	createUserService
} from '@components/users/user.factory';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { AuthValidate } from './auth.validate';
import { createActiveUserTokenService } from '../activeUserToken/activeUserToken.factory';
import { AuthMailQueueProducer } from './mail/mail.producer';
import { getQueue } from '../app/loaders/queue/queue';
import { createMailService } from '../mail/mail.factory';
import { AuthMailWorker } from './mail/mail.worker';
import { createPasswordResetTokenService } from './components/passwordResetToken/passwordResetToken.factory';

export function createAuthController() {
	const authService = createAuthService();
	const authMailQueueProducer = createAuthMailQueueProducer();
	const authController = AuthController(
		authMailQueueProducer,
		authService,
		authLogger
	);
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
	const userRepository = createUserRepository();
	const authTokenService = createAuthTokenService();
	const authValidate = createAuthValidate();

	return AuthMiddleware(userRepository, authTokenService, authValidate);
}

export function createAuthValidate() {
	const userRepository = createUserRepository();
	const authTokenService = createAuthTokenService();

	return AuthValidate(userRepository, authTokenService);
}

export function createAuthMailWorker() {
	const queue = createAuthMailQueue();
	const mailService = createMailService();
	const logger = authLogger;

	return AuthMailWorker(queue, mailService, logger);
}

export function createAuthMailQueueProducer() {
	const queue = createAuthMailQueue();
	return AuthMailQueueProducer(queue);
}

export function createAuthMailQueue() {
	return getQueue('auth_mail');
}
