import { OfficeMemberOverviewDto } from '@src/components/officeMembers/@types/dto/OfficeMemberOverview.dto';
import { OfficeOverviewDto } from './OfficeOverview.dto';

export type OfficeWithMembersDto = {
	office: OfficeOverviewDto;
	members: OfficeMemberOverviewDto[];
};
