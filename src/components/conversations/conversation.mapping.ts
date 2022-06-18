import { mapConversationMemberToConversationMemberOverviewDto } from '../conversationMembers/conversationMember.mapping';
import { mapMessageToMessageDto } from '../messages/message.mapping';
import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { ConversationDetailDto } from './@types/dto/ConversationDetail.dto';
import { ConversationOverviewDto } from './@types/dto/ConversationOverview.dto';
import { Conversation } from './conversation.entity';

export const mapConversationToConversationOverviewDto = (
	conversation: Conversation
): ConversationOverviewDto => {
	const { id, officeId, name, type, latestMessage } = conversation;

	return {
		id,
		officeId,
		name,
		type,
		latestMessage: latestMessage
			? mapMessageToMessageDto(latestMessage)
			: null
	};
};

export const mapConversationToConversationDetailDto = (
	conversation: Conversation
): ConversationDetailDto => {
	const {
		id,
		officeId,
		name,
		description,
		type,
		conversationMembers,
		creator
	} = conversation;

	const membersDto = conversationMembers.map(cm =>
		mapConversationMemberToConversationMemberOverviewDto(cm)
	);

	const creatorDto = mapUserToUserOverviewDto(creator);

	return {
		id,
		officeId,
		name,
		description,
		type,
		members: membersDto,
		creator: creatorDto
	};
};
