import { RecentMessagePageable } from '@src/components/messages/@types/RecentMessagePaginate';
import { ConversationOfUserDetailDto } from './dto/ConversationOfUserDetail.dto';
import { ConversationOfUserOverviewDto } from './dto/ConversationOfUserOverview.dto';
import { ConversationOverviewDto } from './dto/ConversationOverview.dto';
import { CreateConversationDto } from './dto/CreateConversation.dto';
import { ReadConversationDto } from './dto/ReadConversation.dto';
import { RecentMessagesDto } from './dto/RecentMessages.dto';

export interface IConversationService {
	createConversation(
		createConversationDto: CreateConversationDto
	): Promise<ConversationOverviewDto>;

	findConversationsOverviewsOfUserInOffice(
		userId: number,
		officeId: number
	): Promise<ConversationOfUserOverviewDto[]>;

	findConversationDetailByConversationIdAndUserId(
		conversationId: number,
		memberId: number
	): Promise<ConversationOfUserDetailDto>;

	findRecentMessagesByConversationIdAndUserId(
		conversationId: number,
		userId: number,
		pageable: RecentMessagePageable
	): Promise<RecentMessagesDto>;

	markAsReadByConversationIdAndUserId(
		conversationId: number,
		userId: number
	): Promise<ReadConversationDto>;
}
