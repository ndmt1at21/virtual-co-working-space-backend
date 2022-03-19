import { Socket } from 'net';

// function catchAsync<T extends any[], U>(
// 	func: (socket: Socket, ...args: T) => PromiseLike<U>
// ): (...args: T) => Promise<void> {
// 	return async (...args) => {
// 		try {
// 			await func(socket, ...args);
// 		} catch (err) {
// 			console.log(func.name + ' caused an error');
// 		}
// 	};
// }
