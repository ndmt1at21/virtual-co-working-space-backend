import { OfficeItemDetailDto } from '@src/components/officeItems/@types/dto/OfficeItemDetail.dto';
import { OfficeItemOverviewDto } from '@src/components/officeItems/@types/dto/OfficeItemOverviewDto';
import { OfficeMemberDetailDto } from '@src/components/officeMembers/@types/dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from '@src/components/officeMembers/@types/dto/OfficeMemberOverview.dto';
import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type OfficeDetailDto = {
	id: string;
	name: string;
	invitationCode: string;
	createdAt: Date;
	createdBy: UserOverviewDto;
	officeItems: OfficeItemOverviewDto[];
	officeMembers: OfficeMemberOverviewDto[];
};
