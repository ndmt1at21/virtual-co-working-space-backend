import { Server as SocketServer, Socket } from 'socket.io';
import { CreateOfficeItemDto } from './@types/dto/CreateOfficeItem.dto';
import { UpdateOfficeItemTransformDto } from './@types/dto/UpdateOfficeItemTransform.dto';
import { IOfficeItemService } from './@types/IOfficeItemService';
import { OfficeItemClientToServerEvent } from './@types/OfficeItemClientToServerEvent';
import { OfficeItemServerToClientEvent } from './@types/OfficeItemServerToClientEvent';

export const OfficeItemSocketService = (
	socketNamespace: SocketServer,
	socket: Socket<
		OfficeItemClientToServerEvent,
		OfficeItemServerToClientEvent,
		any,
		any
	>,
	officeItemService: IOfficeItemService
) => {
	const onOfficeItemCreate = async (data: CreateOfficeItemDto) => {
		const { itemId, officeId, ...transform } = data;

		const officeItem = await officeItemService.createOfficeItem({
			itemId,
			officeId,
			...transform
		});

		socket.emit('office_item:created', officeItem);
	};

	const onOfficeItemMove = async (data: UpdateOfficeItemTransformDto) => {
		const { id, transform } = data;

		socket.emit('office_item:moved', {
			id,
			transform
		});

		await officeItemService.updateOfficeItemTransform(id, transform);
	};

	const onOfficeItemDelete = async (id: number) => {
		await officeItemService.deleteOfficeItem(id);
		socket.emit('office_item:deleted', id);
	};

	return { onOfficeItemCreate, onOfficeItemMove, onOfficeItemDelete };
};
