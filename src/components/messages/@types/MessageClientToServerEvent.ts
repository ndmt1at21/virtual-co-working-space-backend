import { CreateMessageDto } from './dto/CreateMessage.dto';
import { DeleteMessageData } from './dto/DeleteMessageData.dto';
import { RevokeMessageData } from './dto/RevokeMessageData.dto copy';

export interface MessageClientToServerEvent {
	'message:send': (message: CreateMessageDto) => void;
	'message:revoke': (data: RevokeMessageData) => void;
	'message:delete': (data: DeleteMessageData) => void;
	'message:markAsRead': () => void;
	'conversation:join': (data: { conversationId: number }) => void;
	'conversation:leave': (data: { conversationId: number }) => void;
}
