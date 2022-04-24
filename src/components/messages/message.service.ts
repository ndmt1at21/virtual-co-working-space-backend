import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { MessageRepository } from './message.repository';

export const MessageService = (messageRepository: MessageRepository) => {
	const createMessage = async (createMessageDto: CreateMessageDto) => {
		return await messageRepository.save(createMessageDto);
	};

	const revokeMessage = () => {};

	const deleteMessageSelfSide = () => {};

	return {};
};
