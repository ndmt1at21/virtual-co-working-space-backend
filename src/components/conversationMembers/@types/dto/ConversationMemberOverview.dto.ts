import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type ConversationMemberOverviewDto = {
	user: UserOverviewDto;
	joinedAt: Date;
};
