import { getCustomRepository } from 'typeorm';
import { ItemCreator } from './item.creator';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';

export function createItemRepository() {
	return getCustomRepository(ItemRepository);
}

export function createItemService() {
	const itemRepository = createItemRepository();
	const itemCreator = createItemCreator();
	const service = ItemService(itemRepository, itemCreator);
	return service;
}

export function createItemCreator() {
	return ItemCreator();
}
