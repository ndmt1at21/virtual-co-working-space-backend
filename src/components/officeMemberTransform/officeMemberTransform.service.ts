import { CreateOfficeMemberTransformDto } from './@types/dto/CreateOfficeMemberTransform.dto';
import { OfficeMemberTransformDto } from './@types/dto/OfficeMemberTransform.dto';
import { UpdateOfficeMemberTransformDto } from './@types/dto/UpdateOfficeMemberTransform';
import { IOfficeMemberTransformCache } from './@types/IOfficeMemberTransformCache';
import { IOfficeMemberTransformService } from './@types/IOfficeMemberTransformService';
import { OfficeMemberTransformRepository } from './officeMemberTransform.repository';

export const OfficeMemberTransformService = (
	officeMemberTransformRepository: OfficeMemberTransformRepository,
	officeMemberTransformCache: IOfficeMemberTransformCache
): IOfficeMemberTransformService => {
	const createTransform = async (
		officeMemberId: string,
		memberTransform?: CreateOfficeMemberTransformDto
	): Promise<OfficeMemberTransformDto> => {
		return await officeMemberTransformRepository.save({
			officeMemberId,
			...memberTransform
		});
	};

	const updateTransform = async (
		officeMemberId: string,
		memberTransform: UpdateOfficeMemberTransformDto
	): Promise<void> => {
		await officeMemberTransformRepository.update(officeMemberId, {
			...memberTransform
		});
	};

	const findTransformByOfficeMemberId = async (
		memberId: string
	): Promise<OfficeMemberTransformDto | undefined> => {
		const cachedTransform =
			await officeMemberTransformCache.getTransformById(memberId);

		if (cachedTransform) return cachedTransform;

		return await officeMemberTransformRepository.findTransformByOfficeMemberId(
			memberId
		);
	};

	return { createTransform, updateTransform, findTransformByOfficeMemberId };
};
