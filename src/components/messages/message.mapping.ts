import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { MessageDto } from './@types/dto/MessageDto';
import { mapMessageReaderToMessageReaderDto } from './components/messageReader/messageReader.mapping';
import { Message } from './message.entity';

export const mapMessageToMessageDto = (message: Message): MessageDto => {
	const {
		id,
		conversationId,
		sender,
		content,
		createdAt,
		type,
		readers,
		status
	} = message;

	const senderDto = mapUserToUserOverviewDto(sender);

	const readersDto = readers.map(reader =>
		mapMessageReaderToMessageReaderDto(reader)
	);

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
