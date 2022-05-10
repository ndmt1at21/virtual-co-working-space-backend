import { Router } from 'express';
import { createItemController } from './item.factory';

export const ItemRouter = (): Router => {
	const itemController = createItemController();

	const router = Router();

	router
		.route('/:id')
		.get(itemController.getById)
		.delete(itemController.deleteById)
		.patch(itemController.updateById);

	router.route('/').get(itemController.getAll).post(itemController.create);

	return router;
};
