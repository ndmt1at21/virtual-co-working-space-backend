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

			handleOfficeMemberEvents(socket);
			console.log('fgkjgfjk');
			conversationHandler.listen(socketNamespace, socket);
			messageHandler.listen(socketNamespace, socket);
			officeItemHandler.listen(socketNamespace, socket);

			handleInteractionEvent(socket);
		} catch (err) {
			socket.emit('office:error', err);
		}
	});

	socket.on('disconnect', () => {
		officeMemberSocketService.onMemberDisconnect();
	});

	function handleOfficeMemberEvents(socket: Socket) {
		socket.on(
			'office_member:move',
			(transform: UpdateOfficeMemberTransformDto) => {
				officeMemberSocketService.onMemberMove(transform);
			}
		);
	}

	// function handleOfficeItemsEvents(socket: Socket) {
	// 	socket.on('office_item:create', (data: CreateOfficeItemDto) => {
	// 		officeItemSocketService.onOfficeItemCreate(data);
	// 	});

	// 	socket.on('office_item:move', (data: UpdateOfficeItemTransformDto) => {
	// 		officeItemSocketService.onOfficeItemMove(data);
	// 	});

	// 	socket.on('office_item:delete', (id: number) => {
	// 		officeItemSocketService.onOfficeItemDelete(id);
	// 	});
	// }

	// function handleChatEvents(
	// 	socket: Socket<
	// 		OfficeClientToServerEvent,
	// 		OfficeServerToClientEvent,
	// 		any,
	// 		OfficeSocketData
	// 	>
	// ) {
	// 	socket.on('conversation:join', data => {
	// 		messageSocketService.onJoinToConversation(data.conversationId);
	// 	});

	// 	socket.on('conversation:leave', data => {
	// 		messageSocketService.onLeaveFromConversation(data.conversationId);
	// 	});

	// 	socket.on('message:send', (data: CreateMessageDto) => {
	// 		messageSocketService.onCreateMessage(data);
	// 	});

	// 	socket.on('message:revoke', (data: RevokeMessageData) => {
	// 		messageSocketService.onRevokeMessage(data);
	// 	});

	// 	socket.on('message:delete', (data: DeleteMessageData) => {
	// 		messageSocketService.onSelfDeleteMessage(data);
	// 	});

	// 	socket.on('message:markAsRead', () => {
	// 		messageSocketService.onMarkAsRead();
	// 	});
	// }

	function handleInteractionEvent(
		socket: Socket<
			OfficeClientToServerEvent,
			OfficeServerToClientEvent,
			any,
			OfficeSocketData
		>
	) {
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
	}
};
