import { groupBy } from '@src/utils/groupBy';
import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { MessageDto } from './@types/dto/MessageDto';
import { mapMessageReaderToMessageReaderDto } from './components/messageReader/messageReader.mapping';
import { mapUserMessageStatusToUserMessageStatusDto } from './components/userMessageStatus/userMessageStatus.mapping';
import { Message } from './message.entity';

export const mapMessageToMessageDto = (message: Message): MessageDto => {
	const {
		id,
		conversationId,
		sender,
		content,
		createdAt,
		type,
		userMessageStatuses,
		status
	} = message;

	const senderDto = mapUserToUserOverviewDto(sender);

	const userMessageStatusesGrouped = groupBy(
		userMessageStatuses.map(ums =>
			mapUserMessageStatusToUserMessageStatusDto(ums)
		),
		userMessageStatus => userMessageStatus.status
	);

	return {
		id,
		conversationId,
		content,
		type,
		sentAt: createdAt,
		sender: senderDto,
		readers: userMessageStatusesGrouped.readers,
		reactions: [],
		status
	};
};
