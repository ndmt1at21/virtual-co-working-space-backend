import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { ConversationMemberOverviewDto } from './@types/dto/ConversationMemberOverview.dto';
import { ConversationMember } from './conversationMember.entity';

export const mapConversationMemberToConversationMemberOverviewDto = (
	conversationMember: ConversationMember
): ConversationMemberOverviewDto => {
	const { id, member, createdAt } = conversationMember;

	const userDto = mapUserToUserOverviewDto(member);

	return {
		user: userDto,
		joinedAt: createdAt
	};
};
