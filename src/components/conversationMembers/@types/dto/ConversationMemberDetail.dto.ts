import { ConversationOverviewDto } from '@src/components/conversations/@types/dto/ConversationOverview.dto';
import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type ConversationMemberDetailDto = {
	conversation: ConversationOverviewDto;
	members: UserOverviewDto[];
	unreadMessages: number;
	joinedAt: Date;
};
