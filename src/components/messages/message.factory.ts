import { getCustomRepository } from 'typeorm';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

export function createMessageController() {
	const officeService = createMessageService();
	return MessageController(officeService);
}

export function createMessageService() {
	const messageRepository = createMessageRepository();

	return MessageService({
		messageRepository,
		messageReaderRepository,
		messageReceiverRepository,
		userMessageDeletedRepository
	});
}

export function createMessageRepository() {
	return getCustomRepository(MessageRepository);
}
