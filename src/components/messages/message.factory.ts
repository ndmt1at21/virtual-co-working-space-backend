import { Server, Socket } from 'socket.io';
import { getCustomRepository } from 'typeorm';
import { createConversationService } from '../conversations/conversation.factory';
import { messageSocketLogger } from '../logger';
import { createUserMessageStatusRepository } from './components/userMessageStatus/userMessageStatus.factory';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { MessageSocketService } from './message.socketService';

export function createMessageController() {
	const officeService = createMessageService();
	const conversationService = createConversationService();
	return new MessageController(officeService, conversationService);
}

export function createMessageSocketService(io: Server, socket: Socket) {
	const messageService = createMessageService();

	return new MessageSocketService(
		io,
		socket,
		messageService,
		messageSocketLogger
	);
}

export function createMessageService() {
	const messageRepository = createMessageRepository();
	const userMessageStatusRepository = createUserMessageStatusRepository();

	return new MessageService(messageRepository, userMessageStatusRepository);
}

export function createMessageRepository() {
	return getCustomRepository(MessageRepository);
}
