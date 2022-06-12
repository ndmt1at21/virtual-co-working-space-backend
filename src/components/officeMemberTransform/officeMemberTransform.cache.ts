import { IOfficeMemberTransformCache } from './@types/IOfficeMemberTransformCache';
import { OfficeMemberTransformDto } from './@types/dto/OfficeMemberTransform.dto';
import { RedisClientType } from 'redis';

export const OfficeMemberTransformCacheService = (
	client: RedisClientType
): IOfficeMemberTransformCache => {
	const CACHE_PREFIX = 'office_member_transform';

	const setTransform = async (
		id: number,
		memberTransform: OfficeMemberTransformDto
	) => {
		await client.set(
			`${CACHE_PREFIX}:${id}`,
			JSON.stringify({
				memberTransform
			})
		);
	};

	const getTransformById = async (
		id: number
	): Promise<OfficeMemberTransformDto | undefined> => {
		const memberTransform = await client.get(`${CACHE_PREFIX}:${id}`);

		if (!memberTransform) {
			return undefined;
		}

		return JSON.parse(memberTransform).memberTransform as OfficeMemberTransformDto;
	};

	const deleteTransformById = async (id: number) => {
		await client.del(`${id}`);
	};

	const scan = (
		cursor: number,
		chunk: number
	): Promise<{ cursor: number; keys: string[] }> => {
		return client.scan(cursor, { COUNT: chunk });
	};

	const flushAll = async (): Promise<string> => {
		return client.flushAll();
	};

	return {
		setTransform,
		getTransformById,
		deleteTransformById,
		scan,
		flushAll
	};
};
