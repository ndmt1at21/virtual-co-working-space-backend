import { CreateMessageDto } from './dto/CreateMessage.dto';
import { DeleteMessageData } from './dto/DeleteMessageData.dto';
import { MarkAsReadData } from './dto/MarkAsReadData.dto';
import { RevokeMessageData } from './dto/RevokeMessageData.dto';

export interface MessageClientToServerEvent {
	'message:send': (message: CreateMessageDto) => void;
	'message:revoke': (data: RevokeMessageData) => void;
	'message:delete': (data: DeleteMessageData) => void;
	'message:markAsRead': (data: MarkAsReadData) => void;
	'conversation:join': (data: { conversationId: number }) => void;
	'conversation:leave': (data: { conversationId: number }) => void;
}
