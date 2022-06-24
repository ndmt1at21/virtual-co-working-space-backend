import { Server as SocketServer, Socket } from 'socket.io';
import { CallingRoom } from '@components/calling/@types/dto/CallingRoom';
import { ShareScreenDto } from './@types/dto/ShareScreenDto';

export const OfficeSocketHandler = (
	socketNamespace: SocketServer,
	socket: Socket
) => {
	socket.on('calling:join', (data: any) => {
		try {
			console.log(`User with id ${socket.user?.id} has joined calling room ${data.officeId}`)
			socket.join(`calling/${data.officeId}`);
			socket.to(`calling/${data.officeId}`).emit('calling:join', {
				userId: socket.user?.id,
				peerId: data.peerId
			});
		} catch (err) {
			console.log(err);
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

	socket.on('calling:share-screen', (data: ShareScreenDto) => {
		try {
			socket.to(`calling/${data.officeId}`).emit('calling:share-screen', {
				callerId: data.callerId,
			});
		} catch (err) {
			socket.emit('office:error', err);
		}
	});
};
