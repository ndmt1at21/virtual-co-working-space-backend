import { RedisClientType } from 'redis';
import { IOfficeMemberCacheService } from './@types/IOfficeMemberCacheService';

export const OfficeMemberCacheService = (
	cache: RedisClientType
): IOfficeMemberCacheService => {
	const PREFIX = 'office_member';

	const setUserSocket = async (userId: string, socketId: string) => {
		await cache.set(`${PREFIX}:${userId}`, socketId);
	};

	const getUserSocket = async (userId: string): Promise<string | null> => {
		return await cache.get(`${PREFIX}:${userId}`);
	};

	const deleteUserSocket = async (userId: string) => {
		await cache.del(`${PREFIX}:${userId}`);
	};

	return { setUserSocket, getUserSocket, deleteUserSocket };
};
