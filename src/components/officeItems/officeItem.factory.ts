import { Server, Socket } from 'socket.io';
import { getCustomRepository } from 'typeorm';
import { createItemRepository } from '../items/item.factory';
import {
	createOfficeRepository,
	createOfficeService
} from '../offices/office.factory';
import { OfficeItemController } from './officeItem.controller';
import { OfficeItemRepository } from './officeItem.repository';
import { OfficeItemService } from './officeItem.service';
import { OfficeItemSocketService } from './officeItemSocket.service';
import { OfficeItemValidate } from './officeItemValidate';

export function createOfficeItemController() {
	const officeItemService = createOfficeItemService();
	return new OfficeItemController(officeItemService);
}

export function createOfficeItemSocketService(io: Server, socket: Socket) {
	const officeItemService = createOfficeItemService();

	return new OfficeItemSocketService(io, socket, officeItemService);
}

export function createOfficeItemService() {
	const officeItemRepository = getCustomRepository(OfficeItemRepository);
	const officeItemValidate = createOfficeItemValidate();
	return new OfficeItemService(officeItemRepository, officeItemValidate);
}

export function createOfficeItemValidate() {
	const officeRepository = createOfficeRepository();
	const itemRepository = createItemRepository();
	const officeItemRepository = createOfficeItemRepository();

	return OfficeItemValidate(
		officeRepository,
		itemRepository,
		officeItemRepository
	);
}

export function createOfficeItemRepository() {
	return getCustomRepository(OfficeItemRepository);
}
