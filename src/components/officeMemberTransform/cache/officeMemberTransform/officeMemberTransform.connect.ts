import { createClient } from 'redis';

const client = createClient({
	socket: {
		host: 'localhost',
		port: 6383
	}
});

client.connect();

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

export default client;
