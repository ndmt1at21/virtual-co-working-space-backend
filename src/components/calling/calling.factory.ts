import { OfficeSocketHandler } from '@components/calling/calling.socketHandler';
import { Server, Socket } from 'socket.io';

export function createCallingSocketHandler(io: Server, socket: Socket) {
	return OfficeSocketHandler(io, socket);
}