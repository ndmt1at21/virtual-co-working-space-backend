import { ConversationMemberRepository } from '@src/components/conversationMembers/conversationMember.repository';
import { UserMessageStatusRepository } from '@src/components/messages/components/userMessageStatus/userMessageStatus.repository';
import { MessageRepository } from '@src/components/messages/message.repository';
import { ConversationRepository } from '../conversation.repository';

export type ConversationServiceParams = {
	conversationRepository: ConversationRepository;
	conversationMemberRepository: ConversationMemberRepository;
	messageRepository: MessageRepository;
	userMessageStatusRepository: UserMessageStatusRepository;
};
