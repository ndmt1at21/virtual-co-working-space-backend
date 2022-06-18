import { MessageDto } from '@src/components/messages/@types/dto/MessageDto';
import { ConversationType } from '../ConversationType';

export type ConversationOverviewDto = {
	id: number;
	officeId: number;
	name?: string;
	type: ConversationType;
	latestMessage: MessageDto | null;
};
