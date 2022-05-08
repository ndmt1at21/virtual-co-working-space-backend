import { CreateMessageDto } from './dto/CreateMessage.dto';

export interface MessageClientToServerEvent {
	'message:send': (message: CreateMessageDto) => void;
	'message:revoke': (messageId: number) => void;
	'message:delete': (messageId: number) => void;
	'message:markAsRead': () => void;
}
