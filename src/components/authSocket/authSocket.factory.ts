import { createAuthValidate } from '../auth/auth.factory';
import { AuthSocketMiddleware } from './authSocket.middleware';
import { ILogger } from '@components/logger/@types/ILogger';

export function createSocketMiddleware(logger: ILogger) {
	const authValidate = createAuthValidate();

	return new AuthSocketMiddleware(authValidate, logger);
}
