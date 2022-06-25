import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });

export const notificationConfig = {
	NOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME:
		+process.env.NOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME!,

	FIREBASE_APPLICATION_CREDENTIALS: path.resolve(
		global.__basedir || '',
		process.env.FIREBASE_APPLICATION_CREDENTIALS!
	)
};
