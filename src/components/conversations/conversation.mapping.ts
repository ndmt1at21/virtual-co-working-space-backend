import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import { mapConversationMemberToConversationMemberDto } from '../conversationMembers/conversationMember.mapping';
import { ConversationOfUserDto } from './@types/dto/ConversationOfUser.dto';
import { Conversation } from './conversation.entity';

export const mapConversationToConversationOverviewDto = (
	conversation: Conversation
) => {
	const { id, officeId, type } = conversation;
	return { id, officeId, type };
};

export const mapConversationToConversationOfUserDto = (
	conversation: Conversation,
	conversationMember: ConversationMember
): ConversationOfUserDto => {
	const { id, officeId, type, conversationMembers } = conversation;
	const { numberOfUnreadMessages } = conversationMember;

	const membersDto = conversationMembers.map(cm =>
		mapConversationMemberToConversationMemberDto(cm)
	);

	return {
		id,
		officeId,
		type,
		unreadMessages: numberOfUnreadMessages,
		conversationMembers: membersDto
	};
};
