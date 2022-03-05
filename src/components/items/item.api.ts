import { Router } from 'express';
import { createItemService } from './item.factory';
import { ItemController } from './item.controller';

export const ItemRouter = (): Router => {
	const itemService = createItemService();
	const itemController = ItemController(itemService);

	const router = Router();

	router
		.route('/:id')
		.get(itemController.getById)
		.delete(itemController.deleteById)
		.patch(itemController.updateById);

	router.route('/').get(itemController.getAll).post(itemController.create);

	return router;
};
