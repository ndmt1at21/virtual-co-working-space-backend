import { mapConversationToConversationOverviewDto } from '../conversations/conversation.mapping';
import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { ConversationMemberDto } from './@types/dto/ConversationMember.dto';
import { ConversationMemberOverviewDto } from './@types/dto/ConversationMemberOverview.dto';
import { ConversationMember } from './conversationMember.entity';

export const mapConversationMemberToConversationMemberOverviewDto = (
	conversationMember: ConversationMember
): ConversationMemberOverviewDto => {
	const { id, member, createdAt } = conversationMember;

	const userDto = mapUserToUserOverviewDto(member);

	return {
		id,
		user: userDto,
		joinedAt: createdAt
	};
};

export const mapConversationMemberToConversationMemberDto = (
	conversationMember: ConversationMember
): ConversationMemberDto => {
	const { numberOfUnreadMessages, createdAt, conversation } =
		conversationMember;

	const conversationDto =
		mapConversationToConversationOverviewDto(conversation);

	return {
		conversation: conversationDto,
		unreadMessages: numberOfUnreadMessages,
		joinedAt: createdAt
	};
};
