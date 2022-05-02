import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type ConversationMemberDto = {
	id: number;
	conversationId: number;
	member: UserOverviewDto;
	joinedAt: Date;
};
