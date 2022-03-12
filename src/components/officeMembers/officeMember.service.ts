import { NotFoundError } from '@src/utils/appError';
import { OfficeMemberDetailDto } from './@types/dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './@types/dto/OfficeMemberOverview.dto';
import { OfficeMemberRepository } from './officeMember.repository';
import { IOfficeMemberTransformService } from '../officeMemberTransform/@types/IOfficeMemberTransformService';
import { IOfficeMemberCreator } from './@types/IOfficeMemberCreator';
import { CreateOfficeMemberDto } from './@types/dto/CreateOfficeMember.dto';

export const OfficeMemberService = (
	officeMemberRepository: OfficeMemberRepository,
	officeMemberTransformService: IOfficeMemberTransformService,
	officeMemberCreator: IOfficeMemberCreator
) => {
	const createOfficeMember = async (
		createOfficeMemberDto: CreateOfficeMemberDto
	): Promise<OfficeMemberOverviewDto> => {
		const { memberId, officeId, transform } = createOfficeMemberDto;

		const createdOfficeMember = await officeMemberRepository.save({
			memberId,
			officeId
		});

		const createdTransform =
			await officeMemberTransformService.createTransform(
				createdOfficeMember.id
			);

		return officeMemberCreator.createOfficeMemberOverview(
			createdOfficeMember,
			createdTransform
		);
	};

	const deleteOfficeMemberById = async (id: string): Promise<void> => {
		const officeMember = await officeMemberRepository.findOne(id);

		if (!officeMember) {
			throw new NotFoundError(`OfficeMember with id ${id} not found`);
		}

		await officeMemberRepository.delete(id);
	};

	const findOfficeMemberOverviewById = async (
		id: string
	): Promise<OfficeMemberOverviewDto> => {
		const officeMember = await officeMemberRepository
			.createQueryBuilder()
			.where('id = :id', { id })
			.getOne();

		if (!officeMember) {
			throw new NotFoundError(`Office member with id ${id} not found`);
		}

		const officeMemberTransform =
			await officeMemberTransformService.findTransformByOfficeMemberId(
				id
			);

		return officeMemberCreator.createOfficeMemberOverview(
			officeMember,
			officeMemberTransform!
		);
	};

	const findOfficeMemberDetailById = async (
		id: string
	): Promise<OfficeMemberDetailDto> => {
		const officeMember = await officeMemberRepository
			.createQueryBuilder()
			.where('id = :id', { id })
			.leftJoin('office_member.member', 'user')
			.leftJoin('office_member.office', 'office')
			.getOne();

		if (!officeMember) {
			throw new NotFoundError(`Office member with id ${id} not found`);
		}

		const officeMemberTransform =
			await officeMemberTransformService.findTransformByOfficeMemberId(
				id
			);

		return officeMemberCreator.createOfficeMemberDetail(
			officeMember,
			officeMemberTransform!
		);
	};

	const findOfficeMembersOverviewByOfficeId = async (
		officeId: string
	): Promise<OfficeMemberOverviewDto[]> => {
		const officeMembers = await officeMemberRepository
			.createQueryBuilder()
			.where('officeId = :officeId', { officeId })
			.leftJoin('office_member.transform', 'office_member_transform')
			.getMany();

		return officeMemberCreator.createOfficeMembersOverview(officeMembers);
	};

	return {
		findOfficeMemberOverviewById,
		findOfficeMemberDetailById,
		findOfficeMembersOverviewByOfficeId
	};
};
