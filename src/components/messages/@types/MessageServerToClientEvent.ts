import { MessageDto } from './dto/MessageDto';
import { MessageOverviewDto } from './dto/MessageOverview.dto';

export interface MessageServerToClientEvent {
	'message:sent': (message: MessageOverviewDto) => void;
	'message:revoked': (messageId: number) => void;
	'message:deleted': (messageId: number) => void;
	'message:read': (toMessageId: number) => void;

	'conversation:joined': (data: {
		userId: number;
		conversationId: number;
	}) => void;

	'conversation:left': (data: {
		userId: number;
		conversationId: number;
	}) => void;
}
