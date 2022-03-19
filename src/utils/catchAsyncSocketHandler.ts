import { Socket } from 'socket.io';

export type AsyncSocketHandler = (...args: any[]) => Promise<void>;

export type SocketHandler = (...args: any[]) => void;

export const catchAsyncSocketHandler = (
	socket: Socket,
	fn: AsyncSocketHandler
): SocketHandler => {
	return (...args) => {
		fn(args).catch(err => {
			socket.emit('error', err);
		});
	};
};
