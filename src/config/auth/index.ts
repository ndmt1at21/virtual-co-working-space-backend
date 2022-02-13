import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const authConfig = {
	JWT_SECRET: process.env.JWT_SECRET!,
	JWT_ACCESS_TOKEN_EXPIRES_AT: process.env.JWT_ACCESS_TOKEN_EXPIRES_AT,
	REFRESH_TOKEN_EXPIRES_AT: process.env.REFRESH_TOKEN_EXPIRES_AT
};
