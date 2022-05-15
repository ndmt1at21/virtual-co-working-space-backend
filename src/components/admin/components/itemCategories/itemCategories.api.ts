import {
	createItemCategoryController,
	createItemCategoryReqValidation
} from '@src/components/itemCategories/itemCategory.factory';
import { Router } from 'express';

export const ItemCategoryRouter = (): Router => {
	const router = Router();
	const itemCategoryController = createItemCategoryController();
	const itemCategoryReqValidation = createItemCategoryReqValidation();

	router
		.route('/:id')
		.get(itemCategoryController.getItemCategoryById)
		.patch(
			itemCategoryReqValidation.validateUpdateItemCategoryDto,
			itemCategoryController.updateItemCategory
		)
		.delete(itemCategoryController.deleteItemCategoryById);

	router
		.route('/')
		.post(
			itemCategoryReqValidation.validateCreateItemCategoryDto,
			itemCategoryController.createItemCategory
		)
		.get(itemCategoryController.getAllItemCategories);

	return router;
};
