import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { CreateMessageDto } from './dto/CreateMessage.dto';
import { MessageDto } from './dto/MessageDto';
import { MessageQuery } from './filter/MessageQuery';
import {
	RecentMessagePageable,
	RecentMessagePaginationInfo
} from './RecentMessagePaginate';

export interface IMessageService {
	getMessageById(id: number): Promise<MessageDto>;

	getMessages(query: MessageQuery): Promise<[MessageDto[], PaginationInfo]>;

	getRecentMessagesByConversationId(
		conversationId: number,
		pageable: RecentMessagePageable
	): Promise<[MessageDto[], RecentMessagePaginationInfo]>;

	createMessage(createMessageDto: CreateMessageDto): Promise<MessageDto>;

	revokeMessageByMessageIdAndSenderId(
		messageId: number,
		senderId: number
	): Promise<MessageDto>;

	deleteMessageSelfSide(messageId: number, userId: number): Promise<void>;

	addMessageReader(messageId: number, readerId: number): Promise<void>;

	addMessageReceiver(messageId: number, receiverId: number): Promise<void>;

	addMessageReaction(
		messageId: number,
		actorId: number,
		reaction: string
	): Promise<void>;
}
