import { getCustomRepository } from 'typeorm';
import { createConversationMemberRepository } from '../conversationMembers/conversationMember.factory';
import { createMessageRepository } from '../messages/message.factory';
import { OfficeService } from '../offices/office.service';
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

	return ConversationService({
		conversationMemberRepository,
		conversationRepository,
		messageRepository
	});
}

export function createConversationRepository() {
	return getCustomRepository(ConversationRepository);
}
