import { OfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/OfficeMemberTransform.dto';
import { OfficeMember } from '../officeMember.entity';
import { OfficeMemberDetailDto } from './dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './dto/OfficeMemberOverview.dto';

export interface IOfficeMemberCreator {
	createOfficeMemberOverviewById(
		id: string
	): Promise<OfficeMemberOverviewDto>;

	createOfficeMemberDetailById(id: string): Promise<OfficeMemberDetailDto>;

	createOfficeMembersOverviewByOfficeId(
		officeId: string
	): Promise<OfficeMemberOverviewDto[]>;
}
