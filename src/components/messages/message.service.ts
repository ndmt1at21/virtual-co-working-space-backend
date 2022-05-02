import { NotFoundError } from '@src/utils/appError';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { MessageDto } from './@types/dto/MessageDto';
import { MessageQuery } from './@types/filter/MessageQuery';
import { IMessageService } from './@types/IMessageService';
import { MessageServiceParams } from './@types/MessageServiceParams';
import {
	RecentMessagePageable,
	RecentMessagePaginationInfo
} from './@types/RecentMessagePaginate';
import { MessageErrorMessages } from './message.error';
import { mapMessageToMessageDto } from './message.mapping';

export const MessageService = ({
	messageRepository,
	messageReaderRepository,
	messageReceiverRepository,
	userMessageDeletedRepository
}: MessageServiceParams): IMessageService => {
	const createMessage = async (
		createMessageDto: CreateMessageDto
	): Promise<MessageDto> => {
		const createdMessage = await messageRepository.save(createMessageDto);
		return createdMessage;
	};

	const revokeMessageByMessageIdAndSenderId = async (
		messageId: number,
		senderId: number
	): Promise<boolean> => {
		const message = await messageRepository.findByMessageIdAndSenderId(
			messageId,
			senderId
		);

		if (!message)
			throw new NotFoundError(MessageErrorMessages.MESSAGE_NOT_FOUND);

		await messageRepository.save({
			...message,
			isRevoked: true,
			revokedAt: new Date()
		});

		return true;
	};

	const deleteMessageSelfSide = async (
		messageId: number,
		userId: number
	): Promise<void> => {
		await userMessageDeletedRepository.save({
			messageId,
			userId
		});
	};

	const addMessageReader = async (
		messageId: number,
		readerId: number
	): Promise<void> => {
		await messageReaderRepository.save({ messageId, readerId });
	};

	const addMessageReceiver = async (
		messageId: number,
		receiverId: number
	): Promise<void> => {
		await messageReceiverRepository.save({ messageId, receiverId });
	};

	const addMessageReaction = async (
		messageId: number,
		actorId: number,
		reaction: string
	): Promise<void> => {};

	return {
		createMessage,
		findRecentMessagesByConversationIdAndUserId,
		revokeMessageByMessageIdAndSenderId,
		deleteMessageSelfSide,
		addMessageReader,
		addMessageReceiver,
		addMessageReaction
	};
};
