import { Server as SocketServer, Socket } from 'socket.io';
import { CreateOfficeItemDto } from './@types/dto/CreateOfficeItem.dto';
import { DeleteOfficeItemDto } from './@types/dto/DeleteOfficeItem.dto';
import { UpdateOfficeItemTransformDto } from './@types/dto/UpdateOfficeItemTransform.dto';
import { IOfficeItemService } from './@types/IOfficeItemService';
import { OfficeItemClientToServerEvent } from './@types/OfficeItemClientToServerEvent';
import { OfficeItemServerToClientEvent } from './@types/OfficeItemServerToClientEvent';
import { OfficeItemRepository } from './officeItem.repository';

export const OfficeItemSocketService = (
	socketNamespace: SocketServer,
	socket: Socket<
		OfficeItemClientToServerEvent,
		OfficeItemServerToClientEvent,
		any,
		any
	>,
	officeItemRepository: OfficeItemRepository,
	officeItemService: IOfficeItemService
) => {
	const onOfficeItemCreate = async (data: CreateOfficeItemDto) => {
		const createdOfficeItem = await officeItemService.createOfficeItem(
			data
		);

		socket.emit('office_item:created', createdOfficeItem);
	};

	const onOfficeItemMove = async (data: UpdateOfficeItemTransformDto) => {
		await officeItemRepository.updateOfficeItemTransformById(
			data.id,
			data.transform
		);
	};

	const onOfficeItemDelete = async (data: DeleteOfficeItemDto) => {};

	return { onOfficeItemCreate, onOfficeItemMove, onOfficeItemDelete };
};
