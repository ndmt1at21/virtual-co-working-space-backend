import { ConversationMemberRepository } from '@src/components/conversationMembers/conversationMember.repository';
import { MessageReaderRepository } from '@src/components/messages/components/messageReader/messageReader.repository';
import { MessageRepository } from '@src/components/messages/message.repository';
import { ConversationRepository } from '../conversation.repository';

export type ConversationServiceParams = {
	conversationRepository: ConversationRepository;
	conversationMemberRepository: ConversationMemberRepository;
	messageRepository: MessageRepository;
	messageReaderRepository: MessageReaderRepository;
};
