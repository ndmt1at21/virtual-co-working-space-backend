import path from 'path';

export const notificationConfig = {
	NOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME:
		+process.env.NOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME!,

	FIREBASE_APPLICATION_CREDENTIALS: path.resolve(
		global.__basedir || '',
		process.env.FIREBASE_APPLICATION_CREDENTIALS!
	)
};
