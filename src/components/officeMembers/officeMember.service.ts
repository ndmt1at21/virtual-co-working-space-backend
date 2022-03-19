import { NotFoundError } from '@src/utils/appError';
import { OfficeMemberDetailDto } from './@types/dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './@types/dto/OfficeMemberOverview.dto';
import { OfficeMemberRepository } from './officeMember.repository';
import { IOfficeMemberTransformService } from '../officeMemberTransform/@types/IOfficeMemberTransformService';
import { IOfficeMemberCreator } from './@types/IOfficeMemberCreator';
import { CreateOfficeMemberDto } from './@types/dto/CreateOfficeMember.dto';
import { IOfficeMemberService } from './@types/IOfficeMemberService';
import { UpdateOfficeMemberTransformDto } from '../officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { OfficeMemberErrorMessages } from './officeMember.error';
import { OfficeMemberOnlineStatus } from './@types/OfficeMemberOnlineStatus';
import { Pageable } from '@src/@types/Pageable';
import { mapOfficeMemberToOfficeMemberDetailDto } from './officeMember.mapping';
import { IOfficeMemberValidate } from './@types/IOfficeMemberValidate';
import { OfficeMemberTransformRepository } from '../officeMemberTransform/officeMemberTransform.repository';

export const OfficeMemberService = (
	officeMemberRepository: OfficeMemberRepository,
	officeMemberTransformRepository: OfficeMemberTransformRepository,
	officeMemberCreator: IOfficeMemberCreator,
	officeMemberValidate: IOfficeMemberValidate
): IOfficeMemberService => {
	const createOfficeMember = async (
		createOfficeMemberDto: CreateOfficeMemberDto
	): Promise<OfficeMemberOverviewDto> => {
		const { memberId, officeId } = createOfficeMemberDto;

		await officeMemberValidate.checkUniqueUserInOffice(memberId, officeId);

		const createdOfficeMember = await officeMemberRepository.save({
			memberId,
			officeId,
			transform: {}
		});

		return await officeMemberCreator.createOfficeMemberOverviewById(
			createdOfficeMember.id
		);
	};

	const deleteOfficeMemberById = async (id: string): Promise<void> => {
		await officeMemberValidate.checkExistsOfficeMemberById(id);
		await officeMemberRepository.delete(id);
	};

	const updateOfficeMemberTransformById = async (
		id: string,
		transform: UpdateOfficeMemberTransformDto
	): Promise<void> => {
		// await officeMemberTransformService.updateTransform(id, transform);
	};

	const findOfficeMemberDetailById = async (
		id: string
	): Promise<OfficeMemberDetailDto> => {
		return await officeMemberCreator.createOfficeMemberDetailById(id);
	};

	const findOfficeMembersDetail = async (
		pageable: Pageable
	): Promise<[OfficeMemberDetailDto[], number]> => {
		const officeMembers = await officeMemberRepository
			.queryBuilder()
			.withMember()
			.withOfficeHasCreator()
			.withRoles()
			.withTransform()
			.withPageable(pageable)
			.build()
			.getMany();

		const total = await officeMemberRepository.count();

		const officeMembersDto = officeMembers.map(om =>
			mapOfficeMemberToOfficeMemberDetailDto(om)
		);

		return [officeMembersDto, total];
	};

	const setOfficeMemberOnlineStatusById = async (
		id: string,
		status: OfficeMemberOnlineStatus
	): Promise<void> => {
		const officeMember = await officeMemberRepository.findOne(id);

		if (!officeMember) {
			throw new NotFoundError(
				OfficeMemberErrorMessages.OFFICE_MEMBER_NOT_FOUND
			);
		}

		await officeMemberRepository.setOfficeMemberOnlineStatusById(
			id,
			status
		);
	};

	return {
		createOfficeMember,
		deleteOfficeMemberById,
		updateOfficeMemberTransformById,
		findOfficeMemberDetailById,
		findOfficeMembersDetail,
		setOfficeMemberOnlineStatusById
	};
};
