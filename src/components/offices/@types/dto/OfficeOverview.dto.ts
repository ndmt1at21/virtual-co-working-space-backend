import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type OfficeOverviewDto = {
	id: number;
	name: string;
	invitationCode: string;
	avatarUrl?: string;
	createdAt: Date;
	createdBy: UserOverviewDto;
	numberOfMembers: number;
	numberOfItems: number;
};
