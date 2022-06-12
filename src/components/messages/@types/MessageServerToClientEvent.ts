import { ReadConversationDto } from '@src/components/conversations/@types/dto/ReadConversation.dto';
import { MessageOverviewDto } from './dto/MessageOverview.dto';
import { RevokedMessageData } from './dto/RevokedMessageData.dto';

export interface MessageServerToClientEvent {
	'message:sent': (message: { tempId: string } & MessageOverviewDto) => void;
	'message:revoked': (data: RevokedMessageData) => void;
	'message:deleted': (messageId: number) => void;
	'message:read': (data: ReadConversationDto) => void;

	'conversation:joined': (data: {
		userId: number;
		conversationId: number;
	}) => void;

	'conversation:left': (data: {
		userId: number;
		conversationId: number;
	}) => void;
}
