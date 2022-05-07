import { OfficeItemOverviewDto } from '@src/components/officeItems/@types/dto/OfficeItemOverviewDto';
import { OfficeMemberOverviewDto } from '@src/components/officeMembers/@types/dto/OfficeMemberOverview.dto';
import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type OfficeDetailDto = {
	id: number;
	name: string;
	invitationCode: string;
	avatarUrl?: string;
	description?: string;
	createdAt: Date;
	createdBy: UserOverviewDto;
	officeItems: OfficeItemOverviewDto[];
	officeMembers: OfficeMemberOverviewDto[];
};
