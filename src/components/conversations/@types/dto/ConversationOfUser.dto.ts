import { ConversationMemberDto } from '@src/components/conversationMembers/@types/conversationMember.dto';
import { ConversationType } from '../ConversationType';

export type ConversationOfUserDto = {
	id: number;
	officeId: number;
	type: ConversationType;
	unreadMessages: number;
	conversationMembers: ConversationMemberDto[];
};
