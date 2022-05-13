import { Server as SocketServer, Socket } from 'socket.io';
import { CallingRoom } from '@components/calling/@types/dto/CallingRoom';

export const OfficeSocketHandler = (
	socketNamespace: SocketServer,
	socket: Socket
) => {
	socket.on('calling:join', (data: any) => {
		try {
			socket.join(`calling/${data.officeId}`);
			socket.to(`calling/${data.officeId}`).emit('calling:join', {
				userId: socket.user?.id,
				peerId: data.peerId
			});
		} catch (err) {
			socket.emit('office:error', err);
		}
	});

	socket.on('calling:leave', (data: CallingRoom) => {
		try {
			socket.leave(`calling/${data.officeId}`);
			socket.to(`calling/${data.officeId}`).emit('calling:leave', {
				userId: socket.user?.id
			});
		} catch (err) {
			socket.emit('office:error', err);
		}
	});
};
