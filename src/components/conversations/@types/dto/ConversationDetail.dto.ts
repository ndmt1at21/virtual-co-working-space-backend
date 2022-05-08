import { ConversationMemberOverviewDto } from '@src/components/conversationMembers/@types/dto/ConversationMemberOverview.dto';
import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';
import { ConversationType } from '../ConversationType';

export type ConversationDetailDto = {
	id: number;
	officeId: number;
	name?: string;
	description?: string;
	type: ConversationType;
	creator: UserOverviewDto;
	members: ConversationMemberOverviewDto[];
};
