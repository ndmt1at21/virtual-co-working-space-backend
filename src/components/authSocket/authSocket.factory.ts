import { createAuthValidate } from '../auth/auth.factory';
import { createAuthTokenService } from '../authToken/authToken.factory';
import { createUserRepository } from '../users/user.factory';
import { AuthSocketMiddleware } from './authSocket.middleware';

export function createSocketMiddleware() {
	const userRepository = createUserRepository();
	const authTokenService = createAuthTokenService();
	const authValidate = createAuthValidate();

	return AuthSocketMiddleware(userRepository, authTokenService, authValidate);
}
