import { RecentMessagePageable } from '@src/components/messages/@types/RecentMessagePaginate';
import { ConversationDetailDto } from './dto/ConversationDetail.dto';
import { RecentMessagesDto } from './dto/RecentMessages.dto';

export interface IConversationService {
	findRecentMessagesByConversationIdAndUserId(
		conversationId: number,
		userId: number,
		pageable: RecentMessagePageable
	): Promise<RecentMessagesDto>;

	findConversationDetailByConversationIdAndUserId(
		conversationId: number,
		memberId: number
	): Promise<ConversationDetailDto>;

	markAsReadByConversationIdAndUserId(
		conversationId: number,
		userId: number
	): Promise<void>;
}
