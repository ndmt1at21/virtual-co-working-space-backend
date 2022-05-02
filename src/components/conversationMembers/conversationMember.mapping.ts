import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { ConversationMemberDto } from './@types/conversationMember.dto';
import { ConversationMember } from './conversationMember.entity';

export const mapConversationMemberToConversationMemberDto = (
	conversationMember: ConversationMember
): ConversationMemberDto => {
	const { id, conversationId, member, createdAt } = conversationMember;

	const memberDto = mapUserToUserOverviewDto(member);

	return { id, conversationId, member: memberDto, joinedAt: createdAt };
};
