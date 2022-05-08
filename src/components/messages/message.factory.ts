import { Server, Socket } from 'socket.io';
import { getCustomRepository } from 'typeorm';
import { createConversationService } from '../conversations/conversation.factory';
import { createUserMessageStatusRepository } from './components/userMessageStatus/userMessageStatus.factory';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { MessageSocketService } from './message.socketService';

export function createMessageController() {
	const officeService = createMessageService();
	const conversationService = createConversationService();
	return MessageController(officeService, conversationService);
}

export function createMessageSocketService(io: Server, socket: Socket) {
	const messageService = createMessageService();

	return MessageSocketService({
		socketNamespace: io,
		socket,
		messageService
	});
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
