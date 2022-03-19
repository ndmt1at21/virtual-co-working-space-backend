import { NotFoundError } from '@src/utils/appError';
import { OfficeMemberTransformDto } from './@types/dto/OfficeMemberTransform.dto';
import { UpdateOfficeMemberTransformDto } from './@types/dto/UpdateOfficeMemberTransform';
import { IOfficeMemberTransformCache } from './@types/IOfficeMemberTransformCache';
import { IOfficeMemberTransformService } from './@types/IOfficeMemberTransformService';
import { OfficeMemberTransformRepository } from './officeMemberTransform.repository';

export const OfficeMemberTransformService = (
	officeMemberTransformRepository: OfficeMemberTransformRepository,
	officeMemberTransformCache: IOfficeMemberTransformCache
): IOfficeMemberTransformService => {
	const updateTransformInCacheById = async (
		officeMemberId: string,
		transformDto: UpdateOfficeMemberTransformDto
	): Promise<void> => {
		await officeMemberTransformCache.setTransform(officeMemberId, {
			officeMemberId,
			...transformDto
		});
	};

	const backupTransformFromCacheById = async (id: string): Promise<void> => {
		const transform = await officeMemberTransformCache.getTransformById(id);

		if (transform) {
			await officeMemberTransformRepository.update(id, { ...transform });
			await officeMemberTransformCache.deleteTransformById(id);
		}
	};

	const findTransformById = async (
		id: string
	): Promise<OfficeMemberTransformDto | undefined> => {
		const cachedTransform =
			await officeMemberTransformCache.getTransformById(id);

		if (cachedTransform) {
			return cachedTransform;
		}

		const transform = await officeMemberTransformRepository.findById(id);
		if (!transform) {
			throw new NotFoundError('Office member transform not found');
		}

		return transform;
	};

	return {
		updateTransformInCacheById,
		backupTransformFromCacheById,
		findTransformById
	};
};
