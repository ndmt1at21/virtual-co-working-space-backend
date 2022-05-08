import { CreateMessageDto } from './dto/CreateMessage.dto';

export interface IMessageSocketService {
	onCreateMessage(message: CreateMessageDto): Promise<void>;

	onRevokeMessage(messageId: number): Promise<void>;

	onSelfDeleteMessage(messageId: number): Promise<void>;

	onMarkAsRead(): Promise<void>;

	onJoinToConversation(conversationId: number): Promise<void>;

	onLeaveFromConversation(conversationId: number): Promise<void>;
}
