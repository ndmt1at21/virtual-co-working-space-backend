import { getCustomRepository } from 'typeorm';
import { ConversationMemberRepository } from './conversationMember.repository';

export function createConversationMemberRepository() {
	return getCustomRepository(ConversationMemberRepository);
}
