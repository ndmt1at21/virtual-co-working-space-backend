import {
	RedisClientType,
	createClient,
	RedisClientOptions,
	RedisModules,
	RedisFunctions,
	RedisScripts
} from 'redis';

const conn: { [key: string]: RedisClientType } = {};

export type CacheConnectOption = {
	connName: string;
	options: RedisClientOptions;
};

export const getCacheConnection = (connName: string): RedisClientType => {
	const connection = conn[connName];

	if (!connection) throw new Error('Cache connection not found');

	return connection;
};

export const createCacheConnection = async (options: CacheConnectOption[]) => {
	const promiseConns = options.map(async opt => {
		await connectToClient(opt.connName, opt.options);
	});

	await Promise.all(promiseConns);
};

async function connectToClient(
	connName: string,
	options: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>
): Promise<RedisClientType> {
	const client = createClient(options) as RedisClientType;
	await client.connect();

	conn[connName] = client;

	client.on('error', err => {
		throw err;
	});

	client.on('connect', () => {
		conn[connName] = client;
	});

	return client;
}
