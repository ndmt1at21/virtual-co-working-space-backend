import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';
import { UserMessageReadStatusDto } from '../../components/userMessageStatus/@types/UserMessageStatus.dto';
import { MessageReactionDto } from './MessageReaction.dto';

export type MessageDto = {
	id: number;
	conversationId: number;
	senderId: number;
	senderName: string;
	senderAvatar: string|undefined;
	content?: string;
	type?: string;
	readers?: UserMessageReadStatusDto[];
	reactions?: MessageReactionDto[];
	status: string;
	sentAt: Date;
};
