import { SocketMiddlewareFunction } from '@src/utils/@types/socketMiddleware';

export interface IConversationSocketMiddleware {
	protect: SocketMiddlewareFunction;

	restrictToOwner: SocketMiddlewareFunction;
}
