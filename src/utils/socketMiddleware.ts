import { Server, Socket } from 'socket.io';
import {
	SocketContext,
	SocketMiddlewareErrorFunction,
	SocketMiddlewareFunction
} from './@types/socketMiddleware';

export const SocketMiddleware = (
	fns: (SocketMiddlewareFunction | SocketMiddlewareErrorFunction)[]
) => {
	const middlewares: SocketMiddlewareFunction[] = [];
	const middlewaresError: SocketMiddlewareErrorFunction[] = [];
	let data: SocketContext | null = null;

	fns.forEach(fn => {
		if (fn.length === 3) {
			middlewares.push(fn as SocketMiddlewareFunction);
		}

		if (fn.length === 4) {
			middlewaresError.push(fn as SocketMiddlewareErrorFunction);
		}
	});

	const use = (
		middleware: SocketMiddlewareFunction | SocketMiddlewareErrorFunction
	) => {
		if (middleware.length === 3) {
			middlewares.push(middleware as SocketMiddlewareFunction);
		}

		if (middleware.length === 4) {
			middlewaresError.push(middleware as SocketMiddlewareErrorFunction);
		}
	};

	const execute = (io: Server, socket: Socket) => {
		data = { io, socket };

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
					nextMiddlewareError(err, data!.io, data!.socket, next);
				}
			}

			if (!err) {
				index++;

				if (index < middlewares.length) {
					const nextMiddleware = middlewares[index];
					nextMiddleware(data!.io, data!.socket, next);
				}
			}
		};

		firstMiddleware(data.io, data.socket, next);
	};

	return { use, execute };
};
