import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type ConversationMemberOverviewDto = {
	id: number;
	user: UserOverviewDto;
	joinedAt: Date;
};
