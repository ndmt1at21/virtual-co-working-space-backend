import { getCustomRepository } from 'typeorm';
import { createConversationMemberRepository } from '../conversationMembers/conversationMember.factory';
import { conversationSocketLogger } from '../logger';
import { createUserMessageStatusRepository } from '../messages/components/userMessageStatus/userMessageStatus.factory';
import { createMessageRepository } from '../messages/message.factory';
import { ConversationController } from './conversation.controller';
import { ConversationRepository } from './conversation.repository';
import { ConversationService } from './conversation.service';
import { ConversationSocketController } from './conversation.socketController';
import { ConversationSocketReqValidation } from './conversation.socketReqValidate';
import { ConversationValidate } from './conversation.validate';
import { ConversationSocketMiddleware } from './conversation.socketMiddleware';

export function createConversationController() {
	return new ConversationController(createConversationService());
}

export function createConversationValidate() {
	const conversationRepository = createConversationRepository();
	const conversationMemberRepository = createConversationMemberRepository();

	return new ConversationValidate(
		conversationRepository,
		conversationMemberRepository
	);
}

export function createConversationSocketMiddleware() {
	const conversationRepository = createConversationRepository();
	const conversationMemberRepository = createConversationMemberRepository();

	return new ConversationSocketMiddleware(
		conversationRepository,
		conversationMemberRepository
	);
}

export function createConversationSocketController() {
	const conversationService = createConversationService();

	return new ConversationSocketController(
		conversationService,
		conversationSocketLogger
	);
}

export function createConversationSocketReqValidation() {
	return new ConversationSocketReqValidation();
}

export function createConversationService() {
	const conversationRepository = createConversationRepository();
	const conversationMemberRepository = createConversationMemberRepository();
	const messageRepository = createMessageRepository();
	const userMessageStatusRepository = createUserMessageStatusRepository();
	const conversationValidate = createConversationValidate();

	return new ConversationService(
		conversationRepository,
		conversationMemberRepository,
		messageRepository,
		userMessageStatusRepository,
		conversationValidate
	);
}

export function createConversationRepository() {
	return getCustomRepository(ConversationRepository);
}
