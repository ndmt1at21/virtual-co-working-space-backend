import util from 'util';
import { createClient } from 'redis';
import { ItemDto } from '../@types/dto/Item.dto';
import { IItemCacheService } from '../@types/IItemCacheService';

const client = createClient({
	socket: {
		port: 6381
	}
});

client.on('connect', () =>
	console.log('Redis client for caching item is connected')
);

export const ItemCacheService = (): IItemCacheService => {
	const setItem = async (
		key: string,
		value: ItemDto,
		expireSecond: number
	) => {
		await util.promisify(client.set)(key, JSON.stringify(value));
		await util.promisify(client.expire)(key, expireSecond);
	};

	const getItem = async (id: number): Promise<ItemDto | null> => {
		const item = await util.promisify(client.get)(id);

		if (!item) return null;

		return JSON.parse(item) as ItemDto;
	};

	const invalidateItem = async (id: number): Promise<number> => {
		return util.promisify(client.del).bind(id)();
	};

	return { setItem, getItem, invalidateItem };
};
