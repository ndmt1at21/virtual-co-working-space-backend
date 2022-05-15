import {
	createItemController,
	createItemReqValidation
} from '@src/components/items/item.factory';
import { Router } from 'express';

export const ItemRouter = (): Router => {
	const itemController = createItemController();
	const itemReqValidation = createItemReqValidation();

	const router = Router();

	router.param('id', itemReqValidation.validateItemId);

	router
		.route('/:id')
		.get(itemController.getById)
		.patch(
			itemReqValidation.validateUpdateItemData,
			itemController.updateById
		)
		.delete(itemController.deleteById);

	router
		.route('/')
		.get(itemController.getAll)
		.post(itemReqValidation.validateCreateItemData, itemController.create);

	return router;
};
