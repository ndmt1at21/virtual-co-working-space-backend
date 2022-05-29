import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { ConversationMemberOverviewDto } from './@types/dto/ConversationMemberOverview.dto';
import { ConversationMember } from './conversationMember.entity';

export const mapConversationMemberToConversationMemberOverviewDto = (
	conversationMember: ConversationMember
): ConversationMemberOverviewDto => {
	const { id, conversationId, memberId, member, createdAt } =
		conversationMember;

	const userDto = member ? mapUserToUserOverviewDto(member) : undefined;

	return {
		id,
		conversationId,
		userId: member ? undefined : memberId,
		user: userDto,
		joinedAt: createdAt
	};
};
