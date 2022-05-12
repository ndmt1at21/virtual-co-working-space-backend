import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { MessageOverviewDto } from './@types/dto/MessageOverview.dto';
import { IMessageService } from './@types/IMessageService';
import { UserMessageStatusType } from './@types/UserMessageStatusType';
import { UserMessageStatusRepository } from './components/userMessageStatus/userMessageStatus.repository';
import { MessageErrorMessages } from './message.error';
import { mapMessageToMessageOverviewDto } from './message.mapping';
import { MessageRepository } from './message.repository';

export class MessageService implements IMessageService {
	constructor(
		private readonly messageRepository: MessageRepository,
		private readonly userMessageStatusRepository: UserMessageStatusRepository
	) {}

	createMessage = async (
		createMessageDto: CreateMessageDto
	): Promise<MessageOverviewDto> => {
		const createdMessage = await this.messageRepository.createMessage(
			createMessageDto
		);

		return mapMessageToMessageOverviewDto(createdMessage);
	};

	revokeMessageByMessageIdAndSenderId = async (
		messageId: number,
		senderId: number
	): Promise<boolean> => {
		const message = await this.messageRepository.findByMessageIdAndSenderId(
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

		await this.messageRepository.save({
			...message,
			isRevoked: true,
			revokedAt: new Date()
		});

		return true;
	};

	deleteMessageSelfSide = async (
		messageId: number,
		userId: number
	): Promise<void> => {
		const userMessageStatus =
			await this.userMessageStatusRepository.findByMessageIdAndUserIdAndStatus(
				messageId,
				userId,
				UserMessageStatusType.DELETED
			);

		if (userMessageStatus) {
			throw new NotFoundError(
				MessageErrorMessages.MESSAGE_ALREADY_SELF_SIDE_DELETED
			);
		}

		await this.userMessageStatusRepository.save({
			messageId,
			userId,
			isSelfDeleted: true,
			selfDeletedAt: new Date()
		});
	};

	addMessageReceiver = async (
		messageId: number,
		receiverId: number
	): Promise<void> => {
		await this.userMessageStatusRepository.save({
			messageId,
			userId: receiverId,
			isReceived: true,
			receivedAt: new Date()
		});
	};

	addMessageReaction = async (
		messageId: number,
		actorId: number,
		reaction: string
	): Promise<void> => {};
}
