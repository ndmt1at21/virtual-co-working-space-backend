import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type OfficeOverviewDto = {
	id: number;
	name: string;
	invitationCode: string;
	createdAt: Date;
	createdBy: UserOverviewDto;
};
