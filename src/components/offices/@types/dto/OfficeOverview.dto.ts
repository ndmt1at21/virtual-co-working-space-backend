import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type OfficeOverviewDto = {
	id: number;
	name: string;
	invitationCode: string;
	avatarUrl?: string;
	description?: string;
	createdAt: Date;
	createdBy: UserOverviewDto;
	status: string;
	numberOfMembers: number;
	numberOfItems: number;
	lastActiveAt?: Date;
};
