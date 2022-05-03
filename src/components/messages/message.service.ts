import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { MessageDto } from './@types/dto/MessageDto';
import { IMessageService } from './@types/IMessageService';
import { MessageServiceParams } from './@types/MessageServiceParams';
import { UserMessageStatusType } from './@types/UserMessageStatusType';
import { MessageErrorMessages } from './message.error';
import { mapMessageToMessageDto } from './message.mapping';

export const MessageService = ({
	messageRepository,
	userMessageStatusRepository
}: MessageServiceParams): IMessageService => {
	const createMessage = async (
		createMessageDto: CreateMessageDto
	): Promise<MessageDto> => {
		const createdMessage = await messageRepository.createMessage(
			createMessageDto
		);

		return mapMessageToMessageDto(createdMessage);
	};

	const revokeMessageByMessageIdAndSenderId = async (
		messageId: number,
		senderId: number
	): Promise<boolean> => {
		const message = await messageRepository.findByMessageIdAndSenderId(
			messageId,
			senderId
		);

		if (!message) {
			throw new NotFoundError(MessageErrorMessages.MESSAGE_NOT_FOUND);
		}

		if (message.isRevoked) {
			throw new IllegalArgumentError(
				MessageErrorMessages.MESSAGE_ALREADY_REVOKED
			);
		}

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
		const userMessageStatus =
			await userMessageStatusRepository.findByMessageIdAndUserIdAndStatus(
				messageId,
				userId,
				UserMessageStatusType.DELETED
			);

		if (userMessageStatus) {
			throw new NotFoundError(
				MessageErrorMessages.MESSAGE_ALREADY_SELF_SIDE_DELETED
			);
		}

		await userMessageStatusRepository.save({
			messageId,
			userId,
			status: UserMessageStatusType.DELETED
		});
	};

	const addMessageReceiver = async (
		messageId: number,
		receiverId: number
	): Promise<void> => {
		await userMessageStatusRepository.save({
			messageId,
			receiverId,
			status: UserMessageStatusType.RECEIVED
		});
	};

	const addMessageReaction = async (
		messageId: number,
		actorId: number,
		reaction: string
	): Promise<void> => {};

	return {
		addMessageReaction,
		addMessageReceiver,
		createMessage,
		deleteMessageSelfSide,
		revokeMessageByMessageIdAndSenderId
	};
};
