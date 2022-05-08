import { ConversationDetailDto } from './ConversationDetail.dto';

export type ConversationOfUserDetailDto = {
	conversation: ConversationDetailDto;
	unreadMessages: number;
	joinedAt: Date;
};
