import { getCustomRepository } from 'typeorm';
import { createConversationMemberRepository } from '../conversationMembers/conversationMember.factory';
import { createUserMessageStatusRepository } from '../messages/components/userMessageStatus/userMessageStatus.factory';
import { createMessageRepository } from '../messages/message.factory';
import { ConversationController } from './conversation.controller';
import { ConversationRepository } from './conversation.repository';
import { ConversationService } from './conversation.service';

export function createConversationController() {
	return ConversationController(createConversationService());
}

export function createConversationService() {
	const conversationRepository = createConversationRepository();
	const conversationMemberRepository = createConversationMemberRepository();
	const messageRepository = createMessageRepository();
	const userMessageStatusRepository = createUserMessageStatusRepository();

	return ConversationService({
		conversationMemberRepository,
		conversationRepository,
		messageRepository,
		userMessageStatusRepository
	});
}

export function createConversationRepository() {
	return getCustomRepository(ConversationRepository);
}
