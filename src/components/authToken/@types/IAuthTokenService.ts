export interface IAuthTokenService {
	createAccessTokenAndRefreshToken: (
		userId: string
	) => Promise<[string, string]>;

	createAccessToken: (userId: string) => string;

	createRefreshToken: (userId: string) => Promise<string>;

	getUserIdFromAccessToken: (token: string) => Promise<number>;

	blockRefreshToken: (refreshToken: string) => Promise<void>;

	deleteRefreshToken: (refreshToken: string) => Promise<void>;

	validateAccessToken: (token: string) => Promise<boolean>;

	validateRefreshToken: (
		userId: string,
		refreshToken: string
	) => Promise<boolean>;

	validateRefreshTokenCanRenewAccessToken: (
		userId: string,
		refreshToken: string
	) => Promise<boolean>;
}
