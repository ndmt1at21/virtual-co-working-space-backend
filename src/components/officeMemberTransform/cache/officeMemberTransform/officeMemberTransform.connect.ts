import { createClient } from 'redis';

export const connectDatabase = async () => {
	const client = createClient({
		socket: {
			host: 'localhost',
			port: 6383
		}
	});

	await client.connect();

	client.on('connect', () =>
		console.log(
			'Redis client for caching office members transform has been connected.'
		)
	);

	client.on('error', () =>
		console.log(
			'Redis client for caching office members transform has encountered an error.'
		)
	);

	return client;
};
