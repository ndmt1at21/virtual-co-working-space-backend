import { getCustomRepository } from 'typeorm';
import { itemCategoryLogger } from '../logger';
import { ItemCategoryController } from './itemCategory.controller';
import { ItemCategoryRepository } from './itemCategory.repository';
import { ItemCategoryReqValidation } from './itemCategory.reqValidation';
import { ItemCategoryService } from './itemCategory.service';

export function createItemCategoryController() {
	const service = createItemCategoryService();
	return new ItemCategoryController(service, itemCategoryLogger);
}

export function createItemCategoryReqValidation() {
	return new ItemCategoryReqValidation();
}

export function createItemCategoryService() {
	const appearanceCategoryRepository = createItemCategoryRepository();
	return new ItemCategoryService(appearanceCategoryRepository);
}

export function createItemCategoryRepository() {
	return getCustomRepository(ItemCategoryRepository);
}
