import { Server, Socket } from 'socket.io';

export interface IConversationSocketController {
	onJoinToConversation(
		io: Server,
		socket: Socket,
		conversationId: number
	): Promise<void>;

	onLeaveFromConversation(
		io: Server,
		socket: Socket,
		conversationId: number
	): Promise<void>;
}
