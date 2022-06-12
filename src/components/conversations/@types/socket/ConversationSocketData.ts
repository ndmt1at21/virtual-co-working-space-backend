import { OfficeMemberSocketData } from '@src/components/officeMembers/@types/socket/OfficeMemberSocketData';

type ConversationData = {
	id: number;
	isOwner: boolean;
};

type ConversationMemberData = {
	id: number;
	memberId: number;
	conversationId: number;
	status: string;
};

export type ConversationSocketData = OfficeMemberSocketData & {
	conversation: ConversationData;
	conversationMember: ConversationMemberData;
};
