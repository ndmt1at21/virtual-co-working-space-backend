import { OfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/OfficeMemberTransform.dto';
import { OfficeMember } from '../officeMember.entity';
import { OfficeMemberDetailDto } from './dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './dto/OfficeMemberOverview.dto';

export interface IOfficeMemberCreator {
	createOfficeMemberOverviewById(
		id: number
	): Promise<OfficeMemberOverviewDto>;

	createOfficeMemberDetailById(id: number): Promise<OfficeMemberDetailDto>;

	createOfficeMembersOverviewByOfficeId(
		officeId: number
	): Promise<OfficeMemberOverviewDto[]>;
}
