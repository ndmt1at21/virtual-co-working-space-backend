import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { OfficeMemberDetailDto } from './@types/dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './@types/dto/OfficeMemberOverview.dto';
import { OfficeMemberRepository } from './officeMember.repository';
import { IOfficeMemberCreator } from './@types/IOfficeMemberCreator';
import { CreateOfficeMemberDto } from './@types/dto/CreateOfficeMember.dto';
import { IOfficeMemberService } from './@types/IOfficeMemberService';
import { UpdateOfficeMemberTransformDto } from '@components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { OfficeMemberErrorMessages } from './officeMember.error';
import { OfficeMemberOnlineStatus } from './@types/OfficeMemberOnlineStatus';
import { mapOfficeMemberToOfficeMemberDetailDto } from './officeMember.mapping';
import { IOfficeMemberValidate } from './@types/IOfficeMemberValidate';
import { Pageable } from '../base/@types/FindAllOptions';
import { OfficeMemberStatus } from './@types/OfficeMemberStatus';
import { OfficeRoleRepository } from '../officeRoles/officeRole.repository';
import { OfficeMemberRoleRepository } from '../officeMemberRole/officeMemberRole.repository';
import { OfficeRoleType } from '../officeRoles/@types/OfficeRoleType';

export class OfficeMemberService implements IOfficeMemberService {
	constructor(
		private readonly officeMemberRepository: OfficeMemberRepository,
		private readonly officeRoleRepository: OfficeRoleRepository,
		private readonly officeMemberRoleRepository: OfficeMemberRoleRepository,
		private readonly officeMemberCreator: IOfficeMemberCreator,
		private readonly officeMemberValidate: IOfficeMemberValidate
	) {}
	createOfficeMember = async (
		createOfficeMemberDto: CreateOfficeMemberDto
	): Promise<OfficeMemberOverviewDto> => {
		const { memberId, officeId } = createOfficeMemberDto;

		await this.officeMemberValidate.checkUniqueUserInOffice(
			memberId,
			officeId
		);

		const createdMember =
			await this.officeMemberRepository.saveOfficeMember({
				memberId,
				officeId,
				transform: {}
			});

		return await this.officeMemberCreator.createOfficeMemberOverviewById(
			createdMember.id
		);
	};

	async removeOfficeMemberById(id: number): Promise<void> {
		const officeMember = await this.officeMemberRepository
			.queryBuilder()
			.findById(id)
			.withRoles()
			.build()
			.getOne();

		if (officeMember?.status === OfficeMemberStatus.REMOVED) {
			throw new IllegalArgumentError(
				OfficeMemberErrorMessages.OFFICE_MEMBER_REMOVED
			);
		}

		await this.officeMemberRepository.removeOfficeMemberById(id);
	}

	async updateOfficeMemberTransformById(
		id: number,
		transform: UpdateOfficeMemberTransformDto
	): Promise<void> {
		// await officeMemberTransformService.updateTransform(id, transform);
	}

	findOfficeMemberOverviewById = async (
		id: number
	): Promise<OfficeMemberOverviewDto> => {
		return await this.officeMemberCreator.createOfficeMemberOverviewById(
			id
		);
	};

	findOfficeMemberDetailById = async (
		id: number
	): Promise<OfficeMemberDetailDto> => {
		return await this.officeMemberCreator.createOfficeMemberDetailById(id);
	};

	findOfficeMembersDetail = async (
		pageable: Pageable
	): Promise<[OfficeMemberDetailDto[], number]> => {
		const officeMembers = await this.officeMemberRepository
			.queryBuilder()
			.withMember()
			.withOfficeHasCreator()
			.withRoles()
			.withTransform()
			.build()
			.getMany();

		const total = await this.officeMemberRepository.count();

		const officeMembersDto = officeMembers.map(om =>
			mapOfficeMemberToOfficeMemberDetailDto(om)
		);

		return [officeMembersDto, total];
	};

	setOfficeMemberOnlineStatusById = async (
		id: number,
		status: OfficeMemberOnlineStatus
	): Promise<void> => {
		const officeMember = await this.officeMemberRepository.findOne(id);

		if (!officeMember) {
			throw new NotFoundError(
				OfficeMemberErrorMessages.OFFICE_MEMBER_NOT_FOUND
			);
		}

		await this.officeMemberRepository.setOfficeMemberOnlineStatusById(
			id,
			status
		);
	};

	async addRoleToOfficeMember(
		officeMemberId: number,
		officeRoleId: number
	): Promise<void> {
		// check office member exists
		const officeMemberExists =
			await this.officeMemberRepository.existsOfficeMemberById(
				officeMemberId
			);

		if (!officeMemberExists) {
			throw new NotFoundError(
				OfficeMemberErrorMessages.OFFICE_MEMBER_NOT_FOUND
			);
		}

		// check office role exists and added role is not owner
		const officeRole = await this.officeRoleRepository.findById(
			officeRoleId
		);

		if (!officeRole) {
			throw new NotFoundError('Office role not found');
		}

		if (officeRole?.name === OfficeRoleType.OWNER) {
			throw new IllegalArgumentError(
				OfficeMemberErrorMessages.CANNOT_SET_OWNER_ROLE
			);
		}

		// assure office member role is not exists
		const roleOfMemberExists =
			await this.officeMemberRoleRepository.existsByOfficeMemberIdAndOfficeRoleId(
				officeMemberId,
				officeRoleId
			);

		if (roleOfMemberExists) {
			throw new IllegalArgumentError(
				OfficeMemberErrorMessages.OFFICE_MEMBER_ROLE_ALREADY_EXISTS
			);
		}

		await this.officeMemberRoleRepository.saveOfficeMemberRole(
			officeMemberId,
			officeRoleId
		);
	}

	async removeRoleFromOfficeMember(
		officeMemberId: number,
		officeRoleId: number
	): Promise<void> {
		const officeMemberRole =
			await this.officeMemberRoleRepository.findByOfficeMemberIdAndOfficeRoleId(
				officeMemberId,
				officeRoleId
			);

		if (!officeMemberRole) {
			throw new IllegalArgumentError(
				OfficeMemberErrorMessages.OFFICE_MEMBER_ROLE_NOT_FOUND
			);
		}

		if (officeMemberRole.officeRole.name === OfficeRoleType.OWNER) {
			throw new IllegalArgumentError(
				OfficeMemberErrorMessages.CANNOT_REMOVE_OWNER_ROLE
			);
		}

		await this.officeMemberRoleRepository.delete(officeMemberRole);
	}
}
