import { getCustomRepository } from 'typeorm';
import { itemLogger } from '../logger';
import { ItemController } from './item.controller';
import { ItemCreator } from './item.creator';
import { ItemRepository } from './item.repository';
import { ItemReqValidation } from './item.reqValidation';
import { ItemService } from './item.service';
import { ItemValidate } from './item.validate';

export function createItemController() {
	const itemService = createItemService();
	return new ItemController(itemService, itemLogger);
}

export function createItemReqValidation() {
	return new ItemReqValidation();
}

export function createItemService() {
	const itemRepository = createItemRepository();
	const itemCreator = createItemCreator();
	const itemValidate = createItemValidate();

	return new ItemService(itemRepository, itemCreator, itemValidate);
}

export function createItemValidate() {
	const itemRepository = createItemRepository();
	return new ItemValidate(itemRepository);
}

export function createItemCreator() {
	const itemRepository = createItemRepository();
	return new ItemCreator(itemRepository);
}

export function createItemRepository() {
	return getCustomRepository(ItemRepository);
}
