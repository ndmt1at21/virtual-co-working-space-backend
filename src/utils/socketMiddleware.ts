import { Server, Socket } from 'socket.io';
import {
	SocketContext,
	SocketMiddlewareErrorFunction,
	SocketMiddlewareFunction
} from './@types/socketMiddleware';

export const socketMiddleware = (...fns: SocketMiddlewareFunction[]) => {
	const middlewares: SocketMiddlewareFunction[] = [];
	const middlewaresError: SocketMiddlewareErrorFunction[] = [];

	fns.forEach(fn => {
		middlewares.push(fn as SocketMiddlewareFunction);
	});

	const use = (
		middleware: SocketMiddlewareFunction | SocketMiddlewareErrorFunction
	) => {
		if (middleware.length === 4) {
			middlewares.push(middleware as SocketMiddlewareFunction);
		}

		if (middleware.length === 5) {
			middlewaresError.push(middleware as SocketMiddlewareErrorFunction);
		}
	};

	const execute = (io: Server, socket: Socket, context: any) => {
		let index = 0;
		let indexError = -1;

		if (middlewares.length === 0) return;

		const firstMiddleware:
			| SocketMiddlewareFunction
			| SocketMiddlewareErrorFunction = middlewares[index];

		const next = (err?: Error) => {
			if (err) {
				indexError++;

				if (indexError < middlewaresError.length) {
					const nextMiddlewareError = middlewaresError[indexError];
					nextMiddlewareError(err, io, socket, context, next);
				}
			}

			if (!err) {
				index++;

				if (index < middlewares.length) {
					const nextMiddleware = middlewares[index];
					nextMiddleware(io, socket, context, next);
				}
			}
		};

		firstMiddleware(io, socket, context, next);
	};

	return { use, execute };
};
