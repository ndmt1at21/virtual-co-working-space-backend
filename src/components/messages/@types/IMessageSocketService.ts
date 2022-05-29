import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/CreateMessage.dto';
import { DeleteMessageData } from './dto/DeleteMessageData.dto';
import { MarkMessagesAsReadDto } from './dto/MarkMessagesAsReadData.dto';
import { RevokeMessageData } from './dto/RevokeMessageData.dto';

export interface IMessageSocketService {
	onCreateMessage(message: CreateMessageDto): Promise<void>;

	onRevokeMessage(data: RevokeMessageData): Promise<void>;

	onSelfDeleteMessage(data: DeleteMessageData): Promise<void>;

	onMarkAsRead({
		conversationId,
		readerId
	}: MarkMessagesAsReadDto): Promise<void>;

	onJoinToConversation(
		socketNamespace: Server,
		socket: Socket,
		conversationId: number
	): Promise<void>;

	onLeaveFromConversation(conversationId: number): Promise<void>;
}
