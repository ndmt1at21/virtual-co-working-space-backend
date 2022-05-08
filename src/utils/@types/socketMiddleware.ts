import { Server, Socket } from 'socket.io';

export type NextFunction = (err?: Error) => void;

export type SocketMiddlewareFunction = (
	io: Server,
	socket: Socket,
	context: any,
	next: NextFunction
) => void;

export type SocketMiddlewareErrorFunction = (
	err: Error,
	io: Server,
	socket: Socket,
	context: any,
	next: NextFunction
) => void;

export type SocketContext = {
	io: Server;
	socket: Socket;
	context: any;
	err?: any;
};
