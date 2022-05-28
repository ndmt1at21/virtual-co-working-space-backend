import { MessageStatus } from '@src/@types/MessageStatus';
import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { MessageDto } from './@types/dto/MessageDto';
import { MessageOverviewDto } from './@types/dto/MessageOverview.dto';
import { mapUserMessageStatusToUserMessageReaderStatusDto } from './components/userMessageStatus/userMessageStatus.mapping';
import { Message } from './message.entity';

export const mapMessageToMessageDto = (message: Message): MessageDto => {
	const {
		id,
		conversationId,
		sender,
		content,
		createdAt,
		type,
		isRevoked,
		readers,
		status
	} = message;

	const senderDto = mapUserToUserOverviewDto(sender);

	const readersDto = readers.map(reader =>
		mapUserMessageStatusToUserMessageReaderStatusDto(reader)
	);

	if (isRevoked) {
		return {
			id,
			conversationId,
			sentAt: createdAt,
			sender: senderDto,
			status: 'revoked'
		};
	}

	return {
		id,
		conversationId,
		content,
		type,
		sentAt: createdAt,
		sender: senderDto,
		readers: readersDto,
		reactions: [],
		status
	};
};

export const mapMessageToMessageOverviewDto = (
	message: Message
): MessageOverviewDto => {
	const { id, conversationId, senderId, content, createdAt, type, status } =
		message;

	return {
		id,
		conversationId,
		senderId,
		content,
		type,
		status,
		sentAt: createdAt
	};
};
