import { CreateMessageDto } from './dto/CreateMessage.dto';
import { DeleteMessageData } from './dto/DeleteMessageData.dto';
import { RevokeMessageData } from './dto/RevokeMessageData.dto copy';

export interface IMessageSocketService {
	onCreateMessage(message: CreateMessageDto): Promise<void>;

	onRevokeMessage(data: RevokeMessageData): Promise<void>;

	onSelfDeleteMessage(data: DeleteMessageData): Promise<void>;

	onMarkAsRead(): Promise<void>;

	onJoinToConversation(conversationId: number): Promise<void>;

	onLeaveFromConversation(conversationId: number): Promise<void>;
}
