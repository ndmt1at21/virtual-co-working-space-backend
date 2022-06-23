import { getCustomRepository } from 'typeorm';
import { createConversationService } from '../conversations/conversation.factory';
import { messageSocketLogger } from '../logger';
import { createNotificationService } from '../notifications/notification.factory';
import { createPushNotificationService } from '../pushNotification/pushNotification.factory';
import { createUserMessageStatusRepository } from './components/userMessageStatus/userMessageStatus.factory';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { MessageSocketController } from './message.socketController';
import { MessageSubscriber } from './message.subscriber';

export function createMessageController() {
	const officeService = createMessageService();
	const conversationService = createConversationService();
	return new MessageController(officeService, conversationService);
}

export function createMessageSocketController() {
	const messageService = createMessageService();
	const conversationService = createConversationService();

	return new MessageSocketController(
		messageService,
		conversationService,
		messageSocketLogger
	);
}

export function createMessageSubscriber() {
	const notificationService = createNotificationService();
	const pushNotificationService = createPushNotificationService();

	return MessageSubscriber(
		notificationService,
		pushNotificationService,
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
