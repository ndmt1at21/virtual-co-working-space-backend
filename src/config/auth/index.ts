export const authConfig = {
	JWT_ISSUER: 'virtualspace.com',
	JWT_SECRET: process.env.JWT_SECRET!,
	JWT_ACCESS_TOKEN_EXPIRES_TIME: +process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME!,
	REFRESH_TOKEN_EXPIRES_TIME: +process.env.REFRESH_TOKEN_EXPIRES_TIME!,
	REFRESH_TOKEN_LENGTH: +process.env.REFRESH_TOKEN_LENGTH!,
	BCRYPT_SALT_ROUNDS: 12,

	ACTIVE_USER_TOKEN_LENGTH: +process.env.ACTIVE_USER_TOKEN_LENGTH!,

	RESET_PASSWORD_TOKEN_LENGTH: +process.env.RESET_PASSWORD_TOKEN_LENGTH!,
	RESET_PASSWORD_TOKEN_EXPIRES_TIME:
		+process.env.RESET_PASSWORD_TOKEN_EXPIRES_TIME!,

	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,

	FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID!,
	FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET!,

	BASE_FRONTEND_URL: process.env.CLIENT_DOMAIN!
};
