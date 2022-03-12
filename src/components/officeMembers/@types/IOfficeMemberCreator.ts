import { OfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/OfficeMemberTransform.dto';
import { OfficeMember } from '../officeMember.entity';
import { OfficeMemberDetailDto } from './dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './dto/OfficeMemberOverview.dto';

export interface IOfficeMemberCreator {
	createOfficeMemberOverview(
		officeMember: OfficeMember,
		transform: OfficeMemberTransformDto
	): OfficeMemberOverviewDto;

	createOfficeMemberDetail(
		officeMember: OfficeMember,
		transform: OfficeMemberTransformDto
	): OfficeMemberDetailDto;

	createOfficeMembersOverview(
		officeMembers: OfficeMember[]
	): OfficeMemberOverviewDto[];
}
