import { IOfficeMemberTransformCache } from '../../@types/IOfficeMemberTransformCache';
import { OfficeMemberTransformDto } from '../../@types/dto/OfficeMemberTransform.dto';
import client from './officeMemberTransform.connect';

export const OfficeMemberTransformCacheService =
	(): IOfficeMemberTransformCache => {
		const CACHE_PREFIX = 'office_member_transform';

		const setTransform = async (
			id: string,
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
			id: string
		): Promise<OfficeMemberTransformDto | undefined> => {
			const memberTransform = await client.get(`${CACHE_PREFIX}:${id}`);

			if (!memberTransform) {
				return undefined;
			}

			return JSON.parse(memberTransform) as OfficeMemberTransformDto;
		};

		const deleteTransformById = async (id: string) => {
			await client.del(id);
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
