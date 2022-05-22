import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const notificationConfig = {
	NOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME:
		process.env.NOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME!
};
