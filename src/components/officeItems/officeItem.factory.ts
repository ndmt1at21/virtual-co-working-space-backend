import { Server, Socket } from 'socket.io';
import { getCustomRepository } from 'typeorm';
import { createOfficeService } from '../offices/office.factory';
import { OfficeItemController } from './officeItem.controller';
import { OfficeItemRepository } from './officeItem.repository';
import { OfficeItemService } from './officeItem.service';
import { OfficeItemSocketService } from './officeItemSocket.service';
import { OfficeItemValidate } from './officeItemValidate';

export function createOfficeItemController() {
	const officeItemService = createOfficeItemService();
	return OfficeItemController(officeItemService);
}

export function createOfficeItemSocketService(io: Server, socket: Socket) {
	const officeItemService = createOfficeItemService();

	return OfficeItemSocketService(io, socket, officeItemService);
}

export function createOfficeItemService() {
	const officeItemRepository = getCustomRepository(OfficeItemRepository);
	const officeItemValidate = createOfficeItemValidate();
	return OfficeItemService(officeItemRepository, officeItemValidate);
}

export function createOfficeItemValidate() {
	const officeItemRepository = getCustomRepository(OfficeItemRepository);
	return OfficeItemValidate(officeItemRepository);
}

export function createOfficeItemRepository() {
	return getCustomRepository(OfficeItemRepository);
}
