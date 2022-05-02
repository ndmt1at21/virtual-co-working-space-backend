import { getCustomRepository } from 'typeorm';
import { createMessageReaderRepository } from './components/messageReader/messageReader.factory';
import { createMessageReceiverRepository } from './components/messageReceiver/messageReceiver.factory';
import { createUserMessageDeletedRepository } from './components/userMessageDeleted/userMessageDeleted.factory';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

export function createMessageController() {
	const officeService = createMessageService();
	return MessageController(officeService);
}

export function createMessageService() {
	const messageRepository = createMessageRepository();
	const messageReaderRepository = createMessageReaderRepository();
	const messageReceiverRepository = createMessageReceiverRepository();
	const userMessageDeletedRepository = createUserMessageDeletedRepository();

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
