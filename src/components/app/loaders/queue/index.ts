import { createQueues, QueueConfig } from './queue';

const mailQueue: QueueConfig = {
	queueName: 'auth_mail',
	options: {
		redis: {
			host: 'localhost',
			port: 6379
		}
	}
};

export const createMessageQueues = async () => {
	createQueues([mailQueue]);
};
