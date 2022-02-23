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

	validateRefreshToken: (
		userId: number,
		refreshToken: string
	) => Promise<boolean>;

	validateRefreshTokenCanRenewAccessToken: (
		userId: number,
		refreshToken: string
	) => Promise<boolean>;
}
