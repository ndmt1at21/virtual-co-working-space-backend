import { getCustomRepository } from 'typeorm';
import { ItemCreator } from './item.creator';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';
import { ItemValidate } from './item.validate';

export function createItemService() {
	const itemRepository = createItemRepository();
	const itemCreator = createItemCreator();
	const itemValidate = createItemValidate();

	return ItemService(itemRepository, itemCreator, itemValidate);
}

export function createItemValidate() {
	const itemRepository = createItemRepository();
	return ItemValidate(itemRepository);
}

export function createItemCreator() {
	const itemRepository = createItemRepository();
	return ItemCreator(itemRepository);
}

export function createItemRepository() {
	return getCustomRepository(ItemRepository);
}
