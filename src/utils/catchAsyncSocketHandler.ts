import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { AppError } from './appError';

type SocketRequestHandler = (
	socket: Socket,
	next: (err?: ExtendedError) => void
) => void;

type AsyncSocketRequestHandler = (
	socket: Socket,
	next: (err?: ExtendedError) => void
) => Promise<AppError | void>;

export const catchAsyncSocketHandler = (
	fn: AsyncSocketRequestHandler
): SocketRequestHandler => {
	return (socket, next) => {
		fn(socket, next).catch(err => next(err));
	};
};
