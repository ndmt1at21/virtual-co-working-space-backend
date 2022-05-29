import { AddUsersToConversationDto } from '../dto/AddUsersToConversation.dto';
import { CreateConversationDto } from '../dto/CreateConversation.dto';
import { JoinOrLeaveConversationDto } from '../dto/JoinOrLeaveConversation.dto';
import { UpdateConversationDto } from '../dto/UpdateConversation.dto';

export interface ConversationClientToServerEvent {
	'conversation:join': (data: JoinOrLeaveConversationDto) => void;

	'conversation:leave': (data: JoinOrLeaveConversationDto) => void;

	'conversation:create': (data: CreateConversationDto) => void;

	'conversation:update': (
		data: { conversationId: number } & UpdateConversationDto
	) => void;

	'conversation:add_members': (
		data: { conversationId: number } & AddUsersToConversationDto
	) => void;
}
