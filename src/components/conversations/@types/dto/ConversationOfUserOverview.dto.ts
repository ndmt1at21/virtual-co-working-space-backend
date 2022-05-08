import { ConversationOverviewDto } from './ConversationOverview.dto';

export type ConversationOfUserOverviewDto = {
	conversation: ConversationOverviewDto;
	unreadMessages: number;
	joinedAt: Date;
};
