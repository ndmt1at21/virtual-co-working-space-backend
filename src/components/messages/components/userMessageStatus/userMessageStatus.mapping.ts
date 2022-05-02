import { UserMessageStatusDto } from './@types/UserMessageStatus.dto';
import { UserMessageStatus } from './userMessageStatus.entity';

export const mapUserMessageStatusToUserMessageStatusDto = (
	userMessageStatus: UserMessageStatus
): UserMessageStatusDto => {
	const { id, userId, messageId, status, createdAt } = userMessageStatus;
	return { id, userId, messageId, status, createdAt };
};
