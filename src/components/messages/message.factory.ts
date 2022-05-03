import { getCustomRepository } from 'typeorm';
import { createUserMessageStatusRepository } from './components/userMessageStatus/userMessageStatus.factory';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

export function createMessageController() {
	const officeService = createMessageService();
	return MessageController(officeService);
}

export function createMessageService() {
	const messageRepository = createMessageRepository();
	const userMessageStatusRepository = createUserMessageStatusRepository();

	return MessageService({
		messageRepository,
		userMessageStatusRepository
	});
}

export function createMessageRepository() {
	return getCustomRepository(MessageRepository);
}
