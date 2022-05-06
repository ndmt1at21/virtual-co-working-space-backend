import { createAuthValidate } from '../auth/auth.factory';
import { createAuthTokenService } from '../auth/components/authToken/authToken.factory';
import { createUserRepository } from '../users/user.factory';
import { AuthSocketMiddleware } from './authSocket.middleware';
import { ILogger } from '@components/logger/@types/ILogger';

export function createSocketMiddleware(logger: ILogger) {
	const userRepository = createUserRepository();
	const authTokenService = createAuthTokenService();
	const authValidate = createAuthValidate();

	return AuthSocketMiddleware(userRepository, authTokenService, authValidate, logger);
}
