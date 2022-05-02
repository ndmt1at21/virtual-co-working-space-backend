import { mapUserToUserDto } from '@src/components/users/user.mapping';
import { MessageReaderDto } from '../../@types/dto/MessageReader.dto';
import { MessageReader } from './messageReader.entity';

export const mapMessageReaderToMessageReaderDto = (
	messageReader: MessageReader
): MessageReaderDto => {
	const { reader, createdAt } = messageReader;
	const userDto = mapUserToUserDto(reader);

	return { reader: userDto, readAt: createdAt };
};
