import { CreateMessageDto } from './dto/CreateMessage.dto';

export interface IMessageSocketService {
	onCreateMessage(message: CreateMessageDto): Promise<void>;

	onRevokeMessage(conversationId: number, messageId: number): Promise<void>;

	onSelfDeleteMessage(
		conversationId: number,
		messageId: number
	): Promise<void>;

	onMarkAsRead(): Promise<void>;

	onJoinToConversation(conversationId: number): Promise<void>;

	onLeaveFromConversation(conversationId: number): Promise<void>;
}
