import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const emailConfig = {
	EMAIL_SERVICE_NAME: process.env.EMAIL_SERVICE_NAME!,
	EMAIL_SERVICE_HOST: process.env.EMAIL_SERVICE_HOST!,
	EMAIL_SERVICE_PORT: +process.env.EMAIL_SERVICE_PORT!,
	EMAIL_SERVICE_USERNAME: process.env.EMAIL_SERVICE_USERNAME!,
	EMAIL_SERVICE_PASSWORD: process.env.EMAIL_SERVICE_PASSWORD!
};
