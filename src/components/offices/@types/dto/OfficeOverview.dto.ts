import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type OfficeOverviewDto = {
	id: string;
	name: string;
	invitationCode: string;
	createdAt: Date;
	createdBy: UserOverviewDto;
};
