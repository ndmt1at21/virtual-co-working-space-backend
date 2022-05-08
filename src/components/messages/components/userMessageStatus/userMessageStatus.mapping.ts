import {
	UserMessageReadStatusDto,
	UserMessageReceivedStatusDto
} from './@types/UserMessageStatus.dto';
import { UserMessageStatus } from './userMessageStatus.entity';

export const mapUserMessageStatusToUserMessageReaderStatusDto = (
	userMessageStatus: UserMessageStatus
): UserMessageReadStatusDto => {
	const { userId, messageId, readAt } = userMessageStatus;
	return { readerId: userId, messageId, readAt };
};

export const mapUserMessageStatusToUserMessageReceivedStatusDto = (
	userMessageStatus: UserMessageStatus
): UserMessageReceivedStatusDto => {
	const { userId, messageId, receivedAt } = userMessageStatus;
	return { receiverId: userId, messageId, receivedAt: receivedAt };
};
