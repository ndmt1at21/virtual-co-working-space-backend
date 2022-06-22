import { getCustomRepository } from 'typeorm';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createItemCategoryRepository } from '../itemCategories/itemCategory.factory';
import { itemLogger } from '../logger';
import { ItemRouter } from './item.api';
import { ItemController } from './item.controller';
import { ItemCreator } from './item.creator';
import { ItemRepository } from './item.repository';
import { ItemReqValidation } from './item.reqValidation';
import { ItemService } from './item.service';
import { ItemValidate } from './item.validate';

export function createItemRouter() {
	const itemController = createItemController();
	const itemReqValidation = createItemReqValidation();
	const authMiddleware = createAuthMiddleware();

	return ItemRouter(itemController, itemReqValidation, authMiddleware);
}

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
	const itemCategoryRepository = createItemCategoryRepository();

	return new ItemValidate(itemRepository, itemCategoryRepository);
}

export function createItemCreator() {
	const itemRepository = createItemRepository();
	return new ItemCreator(itemRepository);
}

export function createItemRepository() {
	return getCustomRepository(ItemRepository);
}
