import { Server as SocketServer, Socket } from 'socket.io';
import { CreateOfficeItemDto } from './@types/dto/CreateOfficeItem.dto';
import { UpdateOfficeItemTransformDto } from './@types/dto/UpdateOfficeItemTransform.dto';
import { IOfficeItemService } from './@types/IOfficeItemService';
import { OfficeItemClientToServerEvent } from './@types/OfficeItemClientToServerEvent';
import { OfficeItemServerToClientEvent } from './@types/OfficeItemServerToClientEvent';

export class OfficeItemSocketService {
	constructor(
		private readonly socketNamespace: SocketServer,
		private readonly socket: Socket<
			OfficeItemClientToServerEvent,
			OfficeItemServerToClientEvent,
			any,
			any
		>,
		private readonly officeItemService: IOfficeItemService
	) {}

	onOfficeItemCreate = async (data: CreateOfficeItemDto) => {
		const { itemId, officeId, ...transform } = data;

		const officeItem = await this.officeItemService.createOfficeItem({
			itemId,
			officeId,
			...transform
		});

		this.socket
			.to(`${this.socket.data.officeMember!.officeId}`)
			.emit('office_item:created', officeItem);
	};

	onOfficeItemMove = async (data: UpdateOfficeItemTransformDto) => {
		const { id, transform } = data;

		this.socket
			.to(`${this.socket.data.officeMember!.officeId}`)
			.emit('office_item:moved', {
				id,
				transform
			});

		await this.officeItemService.updateOfficeItemTransform(id, transform);
	};

	onOfficeItemDelete = async (id: number) => {
		await this.officeItemService.deleteOfficeItem(id);

		this.socket
			.to(`${this.socket.data.officeMember!.officeId}`)
			.emit('office_item:deleted', id);
	};
}
