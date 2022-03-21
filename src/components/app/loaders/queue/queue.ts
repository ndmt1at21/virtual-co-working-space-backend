import Bull, { Queue, QueueOptions } from 'bull';

const queues: { [key: string]: Queue } = {};

export type QueueConfig = { queueName: string; options: QueueOptions };

export const getQueue = (queueName: string): Queue => {
	const queue = queues[queueName];
	if (!queue) throw new Error('Queue not found');
	return queue;
};

export const createQueues = async (queueConfigs: QueueConfig[]) => {
	queueConfigs.forEach(async config => {
		const { queueName, options } = config;
		const queue = createQueue(queueName, options);
		queues[queueName] = queue;
	});
};

function createQueue(queueName: string, option: QueueOptions): Queue {
	return new Bull<number>(queueName, option);
}
