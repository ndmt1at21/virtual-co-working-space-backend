import Bull from 'bull';

export const authMailQueue = new Bull('auth_mail_queue', {
	redis: {
		host: 'localhost',
		port: 6379
	}
});
