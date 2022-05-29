import { CreateMessageDto } from '@src/components/messages/@types/dto/CreateMessage.dto';
import { DeleteMessageData } from '@src/components/messages/@types/dto/DeleteMessageData.dto';
import { MarkAsReadData } from '@src/components/messages/@types/dto/MarkAsReadData.dto';
import { RevokeMessageData } from '@src/components/messages/@types/dto/RevokeMessageData.dto';
import { createMessageSocketService } from '@src/components/messages/message.factory';
import { CreateOfficeItemDto } from '@src/components/officeItems/@types/dto/CreateOfficeItem.dto';
import { UpdateOfficeItemTransformDto } from '@src/components/officeItems/@types/dto/UpdateOfficeItemTransform.dto';
import { createOfficeItemSocketService } from '@src/components/officeItems/officeItem.factory';
import { createOfficeMemberSocketService } from '@src/components/officeMembers/officeMember.factory';
import { UpdateOfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { Server as SocketServer, Socket } from 'socket.io';
import { EmojiListenerData } from './@types/dto/EmojiData';
import { OfficeClientToServerEvent } from './@types/OfficeClientToServerEvent';
import { OfficeServerToClientEvent } from './@types/OfficeServerToClientEvent';
import { OfficeSocketData } from './@types/OfficeSocketData';

export const OfficeSocketHandler = (
	socketNamespace: SocketServer,
	socket: Socket<
		OfficeClientToServerEvent,
		OfficeServerToClientEvent,
		any,
		OfficeSocketData
	>
) => {
	const officeMemberSocketService = createOfficeMemberSocketService(
		socketNamespace,
		socket
	);

	const officeItemSocketService = createOfficeItemSocketService(
		socketNamespace,
		socket
	);

	const messageSocketService = createMessageSocketService(
		socketNamespace,
		socket
	);

	socket.on('office_member:join', async data => {
		try {
			await officeMemberSocketService.onJoinToOfficeRoom(data);

			handleOfficeMemberEvents(socket);
			handleOfficeItemsEvents(socket);
			handleChatEvents(socket);
			handleEmojiEvent(socket);
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

	function handleOfficeItemsEvents(socket: Socket) {
		socket.on('office_item:create', (data: CreateOfficeItemDto) => {
			officeItemSocketService.onOfficeItemCreate(data);
		});

		socket.on('office_item:move', (data: UpdateOfficeItemTransformDto) => {
			officeItemSocketService.onOfficeItemMove(data);
		});

		socket.on('office_item:delete', (id: number) => {
			officeItemSocketService.onOfficeItemDelete(id);
		});
	}

	function handleChatEvents(
		socket: Socket<
			OfficeClientToServerEvent,
			OfficeServerToClientEvent,
			any,
			OfficeSocketData
		>
	) {
		socket.on('conversation:join', data => {
			messageSocketService.onJoinToConversation(data.conversationId);
		});

		socket.on('conversation:leave', data => {
			messageSocketService.onLeaveFromConversation(data.conversationId);
		});

		socket.on('message:send', (data: CreateMessageDto) => {
			messageSocketService.onCreateMessage(data);
		});

		socket.on('message:revoke', (data: RevokeMessageData) => {
			messageSocketService.onRevokeMessage(data);
		});

		socket.on('message:delete', (data: DeleteMessageData) => {
			messageSocketService.onSelfDeleteMessage(data);
		});

		socket.on(
			'message:markAsRead',
			function ({ conversationId }: MarkAsReadData) {
				messageSocketService.onMarkAsRead({
					conversationId,
					readerId: socket.data.officeMember!.memberId
				});
			}
		);
	}

	function handleEmojiEvent(
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
	}
};
