import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';
import { MessageReactionDto } from './MessageReaction.dto';
import { MessageReaderDto } from './MessageReader.dto';

export type MessageDto = {
	id: number;
	conversationId: number;
	sender: UserOverviewDto;
	content?: string;
	type?: string;
	readers?: MessageReaderDto[];
	reactions?: MessageReactionDto[];
	status: string;
	sentAt: Date;
};
