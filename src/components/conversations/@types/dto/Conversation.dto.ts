import { ConversationMemberDto } from '@src/components/conversationMembers/@types/conversationMember.dto';
import { ConversationType } from '../ConversationType';

export type ConversationDto = {
	id: number;
	officeId: number;
	type: ConversationType;
	conversationMembers: ConversationMemberDto[];
};
