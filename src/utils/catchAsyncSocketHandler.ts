import { Server, Socket } from 'socket.io';
import {
	NextFunction,
	SocketMiddlewareFunction
} from './@types/socketMiddleware';
import { AppError } from './appError';

type AsyncRequestHandler = (
	io: Server,
	socket: Socket,
	context: any,
	next: NextFunction
) => Promise<AppError | void>;

export const catchAsyncSocketHandler = (
	fn: AsyncRequestHandler
): SocketMiddlewareFunction => {
	return (io, socket, context, next) => {
		fn(io, socket, context, next).catch(err => next(err));
	};
};
