import { UnauthorizedError } from '@src/utils/appError';
import { RefreshTokenStatus } from '../refreshToken/@types/RefreshTokenStatus';
import { RefreshToken } from '../refreshToken/refreshToken.entity';
import { AuthTokenErrorMessages } from './authToken.error';

export const AuthTokenValidate = () => {
	function checkRefreshTokenExists(refreshToken: RefreshToken | undefined) {
		if (!refreshToken) {
			throw new UnauthorizedError(
				AuthTokenErrorMessages.INVALID_REFRESH_TOKEN
			);
		}
	}

	function checkRefreshTokenActive(refreshToken: RefreshToken) {
		if (refreshToken.status === RefreshTokenStatus.BLOCKED) {
			throw new UnauthorizedError(
				AuthTokenErrorMessages.INVALID_REFRESH_TOKEN
			);
		}
	}

	function checkRefreshTokenNotExpired(refreshToken: RefreshToken) {
		if (refreshToken.expiresAt.getTime() < Date.now()) {
			throw new UnauthorizedError(
				AuthTokenErrorMessages.REFRESH_TOKEN_EXPIRED
			);
		}
	}

	return {
		checkRefreshTokenExists,
		checkRefreshTokenActive,
		checkRefreshTokenNotExpired
	};
};
