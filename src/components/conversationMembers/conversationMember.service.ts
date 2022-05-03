import { ConversationMemberServiceParams } from './@types/ConversationMemberServiceParams';
import { ConversationMemberDto } from './@types/dto/ConversationMember.dto';
import { IConversationMemberService } from './@types/IConversationMemberService';
import { mapConversationMemberToConversationMemberDto } from './conversationMember.mapping';

export const ConversationMemberService = ({
	conversationMemberRepository
}: ConversationMemberServiceParams): IConversationMemberService => {
	const findConversationMembersOverviewByUserIdAndOfficeId = async (
		userId: number,
		officeId: number
	): Promise<ConversationMemberDto[]> => {
		const [conversationMembers, _] =
			await conversationMemberRepository.findConversationMembersByUserIdAndOfficeId(
				userId,
				officeId
			);

		const conversationMembersDto = conversationMembers.map(cm =>
			mapConversationMemberToConversationMemberDto(cm)
		);

		return conversationMembersDto;
	};

	return { findConversationMembersOverviewByUserIdAndOfficeId };
};
