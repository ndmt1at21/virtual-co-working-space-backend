import { CreateMessageDto } from './dto/CreateMessage.dto';
import { MessageDto } from './dto/MessageDto';

export interface IMessageService {
	createMessage(createMessageDto: CreateMessageDto): Promise<MessageDto>;

	revokeMessageByMessageIdAndSenderId(
		messageId: number,
		senderId: number
	): Promise<boolean>;

	deleteMessageSelfSide(messageId: number, userId: number): Promise<void>;

	addMessageReceiver(messageId: number, receiverId: number): Promise<void>;

	addMessageReaction(
		messageId: number,
		actorId: number,
		reaction: string
	): Promise<void>;
}