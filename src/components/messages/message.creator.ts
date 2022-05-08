import { ObjectID } from 'typeorm';
import { IUserCreator } from '../users/@types/IUserCreator';
import { MessageRepository } from './message.repository';

export const MessageCreator = (
	messageRepository: MessageRepository,
	userCreator: IUserCreator
) => {
	const createMessageDto = async (id: number) => {
		const message = await messageRepository.findById(id);
		const sender = await userCreator.createUserDtoById(message!.senderId);
	};

	return {
		createMessageDto
	};
};
