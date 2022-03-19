import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { AppError } from './appError';

export type SocketRequestMiddleware = (
	socket: Socket,
	next: (err?: ExtendedError) => void
) => void;

export type AsyncSocketRequestMiddleware = (
	socket: Socket,
	next: (err?: ExtendedError) => void
) => Promise<AppError | void>;

export const catchAsyncSocketMiddleware = (
	fn: AsyncSocketRequestMiddleware
): SocketRequestMiddleware => {
	return (socket, next) => {
		fn(socket, next).catch(err => next(err));
	};
};
