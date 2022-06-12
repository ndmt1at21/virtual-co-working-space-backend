import { socketMiddleware } from '@src/utils/socketMiddleware';
import { Server as SocketServer, Socket } from 'socket.io';
import { OfficeSocketData } from '../offices/@types/OfficeSocketData';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { DeleteMessageData } from './@types/dto/DeleteMessageData.dto';
import { MarkAsReadData } from './@types/dto/MarkAsReadData.dto';
import { RevokeMessageData } from './@types/dto/RevokeMessageData.dto';
import { MessageClientToServerEvent } from './@types/MessageClientToServerEvent';
import { MessageServerToClientEvent } from './@types/MessageServerToClientEvent';
import { createMessageSocketController } from './message.factory';
import EventEmitter from 'events';

export const MessageSocketHandler = () => {
	const messageSocketController = createMessageSocketController();
	const handleError = messageSocketController.handleError;
	const eventEmitter = new EventEmitter();

	const listen = (
		io: SocketServer,
		socket: Socket<
			MessageClientToServerEvent,
			MessageServerToClientEvent,
			any,
			OfficeSocketData
		>
	) => {
		socket.on('message:send', (data: CreateMessageDto) => {
			const fn = socketMiddleware(
				messageSocketController.onCreateMessage
			);

			fn.use(handleError);
			fn.execute(io, socket, { body: data });
		});

		socket.on('message:revoke', (data: RevokeMessageData) => {
			const fn = socketMiddleware(
				messageSocketController.onRevokeMessage
			);

			fn.use(handleError);
			fn.execute(io, socket, { body: data });
		});

		socket.on('message:delete', (data: DeleteMessageData) => {
			const fn = socketMiddleware(
				messageSocketController.onSelfDeleteMessage
			);

			fn.use(handleError);
			fn.execute(io, socket, { body: data });
		});

		socket.on('message:markAsRead', (data: MarkAsReadData) => {
			const fn = socketMiddleware(messageSocketController.onMarkAsRead);

			fn.use(handleError);
			fn.execute(io, socket, { params: { id: data.conversationId } });
		});
	};

	return { listen };
};
