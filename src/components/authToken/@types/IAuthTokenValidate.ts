import { RefreshToken } from '@src/components/refreshToken/refreshToken.entity';

export interface IAuthTokenValidate {
	checkRefreshTokenExists(refreshToken: RefreshToken | undefined): void;

	checkRefreshTokenActive(refreshToken: RefreshToken): void;

	checkRefreshTokenNotExpired(refreshToken: RefreshToken): void;
}
