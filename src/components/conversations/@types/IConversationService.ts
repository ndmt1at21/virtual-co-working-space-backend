import { RecentMessagePageable } from '@src/components/messages/@types/RecentMessagePaginate';
import { ConversationOfUserDto } from './dto/ConversationOfUser.dto';
import { RecentMessagesDto } from './dto/RecentMessages.dto';

export interface IConversationService {
	findRecentMessagesByConversationIdAndUserId(
		conversationId: number,
		userId: number,
		pageable: RecentMessagePageable
	): Promise<RecentMessagesDto>;

	findConversationOfUserByConversationIdAndUserId(
		conversationId: number,
		memberId: number
	): Promise<ConversationOfUserDto>;
}
