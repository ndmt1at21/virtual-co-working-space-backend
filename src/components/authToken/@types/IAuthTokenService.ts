import { CredentialsDto } from '@src/components/auth/@types/dto/Credentials.dto';

export interface IAuthTokenService {
	createAccessTokenAndRefreshToken: (
		userId: number
	) => Promise<[string, string]>;

	createAccessToken: (userId: number) => string;

	createRefreshToken: (userId: number) => Promise<string>;

	getUserIdFromAccessToken: (token: string) => Promise<number>;

	blockRefreshToken: (refreshToken: string) => Promise<void>;

	deleteRefreshToken: (refreshToken: string) => Promise<void>;

	validateAccessToken: (token: string) => Promise<boolean>;

	validateRefreshToken: (refreshToken: string) => Promise<boolean>;

	validateRefreshTokenCanRenewAccessToken: (
		refreshToken: string
	) => Promise<boolean>;

	renewCredentialByRefreshToken: (
		refreshToken: string
	) => Promise<CredentialsDto>;
}
