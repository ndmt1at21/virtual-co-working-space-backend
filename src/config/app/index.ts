import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const appConfig = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 8000,
	SERVER_DOMAIN: process.env.SERVER_DOMAIN!,
	CLIENT_DOMAIN: process.env.CLIENT_DOMAIN!
};
