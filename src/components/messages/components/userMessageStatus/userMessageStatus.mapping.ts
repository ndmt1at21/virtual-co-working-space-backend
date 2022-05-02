import {
	UserMessageReadStatusDto,
	UserMessageReceivedStatusDto
} from './@types/UserMessageStatus.dto';
import { UserMessageStatus } from './userMessageStatus.entity';

export const mapUserMessageStatusToUserMessageReaderStatusDto = (
	userMessageStatus: UserMessageStatus
): UserMessageReadStatusDto => {
	const { id, userId, messageId, status, createdAt } = userMessageStatus;
	return { id, readerId: userId, messageId, readAt: createdAt };
};

export const mapUserMessageStatusToUserMessageReceivedStatusDto = (
	userMessageStatus: UserMessageStatus
): UserMessageReceivedStatusDto => {
	const { id, userId, messageId, status, createdAt } = userMessageStatus;
	return { id, receiverId: userId, messageId, receivedAt: createdAt };
};
