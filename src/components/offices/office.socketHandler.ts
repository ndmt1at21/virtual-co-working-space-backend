import { GestureListenerData } from './@types/dto/GestureData';
import { Server as SocketServer, Socket } from 'socket.io';
import { OfficeClientToServerEvent } from './@types/OfficeClientToServerEvent';
import { OfficeServerToClientEvent } from './@types/OfficeServerToClientEvent';
import { OfficeSocketData } from './@types/OfficeSocketData';
import { createOfficeMemberSocketService } from '../officeMembers/officeMember.factory';
import { UpdateOfficeMemberTransformDto } from '../officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { EmojiListenerData } from './@types/dto/EmojiData';
import { ConversationSocketHandler } from '../conversations/conversation.socketHandler';
import { MessageSocketHandler } from '../messages/message.socketHandler';
import { OfficeItemSocketHandler } from '../officeItems/officeItem.socketHandler';
import { ActionListenerData } from './@types/dto/ActionData';

export const OfficeSocketHandler = (
	socketNamespace: SocketServer,
	socket: Socket<
		OfficeClientToServerEvent,
		OfficeServerToClientEvent,
		any,
		OfficeSocketData
	>
) => {
	const conversationHandler = ConversationSocketHandler();
	const messageHandler = MessageSocketHandler();
	const officeItemHandler = OfficeItemSocketHandler();

	const officeMemberSocketService = createOfficeMemberSocketService(
		socketNamespace,
		socket
	);

	socket.on('office_member:join', async data => {
		try {
			await officeMemberSocketService.onJoinToOfficeRoom(data);
		} catch (err) {
			socket.emit('office:error', err);
		}
	});

	conversationHandler.listen(socketNamespace, socket);
	messageHandler.listen(socketNamespace, socket);
	officeItemHandler.listen(socketNamespace, socket);
	
	socket.on(
		'office_member:move',
		(transform: UpdateOfficeMemberTransformDto) => {
			officeMemberSocketService.onMemberMove(transform);
		}
	);

	socket.on('emoji', (data: EmojiListenerData) => {
		socket.to(`${socket.data.officeMember!.officeId}`).emit('emoji', {
			userId: socket.user!.id,
			emojiId: data.emojiId
		});
	});

	socket.on('gesture', (data: GestureListenerData) => {
		socket.to(`${socket.data.officeMember!.officeId}`).emit('gesture', {
			userId: socket.user!.id,
			gestureId: data.gestureId
		});
	});

	socket.on('action', (data: ActionListenerData) => {
		socket.to(`${data.officeId}`).emit('action', {
			userId: socket.user!.id,
			action: data.action,
		});
	});

	socket.on('disconnect', () => {
		officeMemberSocketService.onMemberDisconnect();
	});
};
