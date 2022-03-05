import { getCustomRepository } from 'typeorm';
import { RefreshTokenRepository } from '../refreshToken/refreshToken.repository';
import { AuthTokenService } from './authToken.service';
import { AuthTokenValidate } from './authToken.validate';

export function createAuthTokenService() {
	const refreshTokenRepository = getCustomRepository(
		RefreshTokenRepository,
		'main'
	);
	const authTokenValidate = createAuthTokenValidate();
	const authTokenService = AuthTokenService(
		refreshTokenRepository,
		authTokenValidate
	);

	return authTokenService;
}

export function createAuthTokenValidate() {
	const authTokenValidate = AuthTokenValidate();
	return authTokenValidate;
}
