import { Server as SocketServer, Socket } from 'socket.io';
import { OfficeClientToServerEvent } from './@types/OfficeClientToServerEvent';
import { OfficeServerToClientEvent } from './@types/OfficeServerToClientEvent';
import { OfficeSocketData } from './@types/OfficeSocketData';
import { createOfficeMemberSocketService } from '../officeMembers/officeMember.factory';
import { createOfficeItemSocketService } from '../officeItems/officeItem.factory';
import { CreateOfficeItemDto } from '../officeItems/@types/dto/CreateOfficeItem.dto';
import { UpdateOfficeItemTransformDto } from '../officeItems/@types/dto/UpdateOfficeItemTransform.dto';
import { UpdateOfficeMemberTransformDto } from '../officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { createMessageSocketService } from '../messages/message.factory';
import { CreateMessageDto } from '../messages/@types/dto/CreateMessage.dto';

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

			socket.on('disconnect', () => {
				officeMemberSocketService.onMemberDisconnect();
			});
		} catch (err) {
			socket.emit('office:error', err);
		}
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
		socket.on('message:send', (data: CreateMessageDto) => {
			messageSocketService.onCreateMessage(data);
		});

		socket.on('message:revoke', (messageId: number) => {
			messageSocketService.onRevokeMessage(messageId);
		});

		socket.on('message:delete', (messageId: number) => {
			messageSocketService.onSelfDeleteMessage(messageId);
		});

		socket.on('message:markAsRead', () => {
			messageSocketService.onMarkAsRead();
		});
	}
};
