import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';
import { MessageReactionDto } from './MessageReaction.dto';
import { MessageReaderDto } from './MessageReader.dto';

export type MessageDto = {
	id: string;
	conversationId: number;
	sender: UserOverviewDto;
	content: string;
	reactions: MessageReactionDto[];
	readers: MessageReaderDto[];
	status: string;
	type: string;
	createdAt: Date;
};
