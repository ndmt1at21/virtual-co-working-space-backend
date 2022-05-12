import { OfficeMemberDetailDto } from './@types/dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './@types/dto/OfficeMemberOverview.dto';
import { IOfficeMemberCreator } from './@types/IOfficeMemberCreator';
import { OfficeMemberRepository } from './officeMember.repository';
import {
	mapOfficeMemberToOfficeMemberDetailDto,
	mapOfficeMemberToOfficeMemberOverviewDto
} from './officeMember.mapping';

export class OfficeMemberCreator implements IOfficeMemberCreator {
	constructor(
		private readonly officeMemberRepository: OfficeMemberRepository
	) {}

	createOfficeMemberOverviewById = async (
		id: number
	): Promise<OfficeMemberOverviewDto> => {
		const officeMember = await this.officeMemberRepository
			.queryBuilder()
			.findById(id)
			.withMember()
			.withTransform()
			.build()
			.getOne();

		return mapOfficeMemberToOfficeMemberOverviewDto(officeMember!);
	};

	createOfficeMemberDetailById = async (
		id: number
	): Promise<OfficeMemberDetailDto> => {
		const officeMember = await this.officeMemberRepository
			.queryBuilder()
			.findById(id)
			.withMember()
			.withOfficeHasCreator()
			.withTransform()
			.withRoles()
			.build()
			.getOne();

		return mapOfficeMemberToOfficeMemberDetailDto(officeMember!);
	};

	createOfficeMembersOverviewByOfficeId = async (
		officeId: number
	): Promise<OfficeMemberOverviewDto[]> => {
		const officeMembers = await this.officeMemberRepository
			.queryBuilder()
			.findByOfficeId(officeId)
			.withMember()
			.withTransform()
			.build()
			.getMany();

		return officeMembers.map(o =>
			mapOfficeMemberToOfficeMemberOverviewDto(o)
		);
	};
}
