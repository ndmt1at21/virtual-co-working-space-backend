import { ConversationMemberOverviewDto } from '@src/components/conversationMembers/@types/dto/ConversationMemberOverview.dto';
import { ConversationOfUserDetailDto } from '../dto/ConversationOfUserDetail.dto';
import { ConversationOverviewDto } from '../dto/ConversationOverview.dto';

export interface ConversationServerToClientEvent {
	'conversation:joined': (data: {
		userId: number;
		conversationId: number;
	}) => void;

	'conversation:left': (data: {
		userId: number;
		conversationId: number;
	}) => void;

	'conversation:created': (data: {
		conversation: ConversationOfUserDetailDto;
	}) => void;

	'conversation:updated': (data: {
		conversation: ConversationOverviewDto;
	}) => void;

	'conversation:members_added': (
		data:
			| {
					newMembers: ConversationMemberOverviewDto[];
			  }
			| {
					conversation: ConversationOfUserDetailDto;
			  }
	) => void;
}
