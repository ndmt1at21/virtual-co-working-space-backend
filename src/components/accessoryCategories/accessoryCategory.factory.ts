import { getCustomRepository } from 'typeorm';
import { AccessoryCategoryController } from './accessoryCategory.controller';
import { AccessoryCategoryRepository } from './accessoryCategory.repository';
import { AccessoryCategoryReqValidation } from './accessoryCategory.reqValidation';
import { AccessoryCategoryService } from './accessoryCategory.service';

export function createAccessoryCategoryController() {
	const service = createAccessoryCategoryService();
	return AccessoryCategoryController(service);
}

export function createAccessoryCategoryReqValidation() {
	return AccessoryCategoryReqValidation();
}

export function createAccessoryCategoryService() {
	const accessoryCategoryRepository = createAccessoryCategoryRepository();
	return AccessoryCategoryService(accessoryCategoryRepository);
}

export function createAccessoryCategoryRepository() {
	return getCustomRepository(AccessoryCategoryRepository);
}
