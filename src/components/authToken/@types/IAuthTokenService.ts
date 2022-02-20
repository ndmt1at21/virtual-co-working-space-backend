export interface IAuthTokenService {
	createAccessTokenAndRefreshToken: (
		userId: number
	) => Promise<[string, string]>;

	createAccessToken: (userId: number) => string;

	createRefreshToken: (userId: number) => Promise<string>;

	validateAccessToken: (token: string) => Promise<boolean>;

	validateRefreshToken: (refreshToken: string) => Promise<boolean>;

	getUserIdFromAccessToken: (token: string) => Promise<number>;
}
