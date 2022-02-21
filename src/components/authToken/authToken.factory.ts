import { getCustomRepository } from 'typeorm';
import { RefreshTokenRepository } from '../refreshToken/refreshToken.repository';
import { AuthTokenService } from './authToken.service';

export function createAuthTokenService() {
	const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
	const authTokenService = AuthTokenService(refreshTokenRepository);

	return authTokenService;
}
