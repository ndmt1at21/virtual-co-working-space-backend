import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createOfficeItemController } from './officeItem.factory';

export const OfficeItemRouter = () => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();
	const officeItemController = createOfficeItemController();

	router.use(authMiddleware.protect);

	router
		.route('/:id')
		.get(officeItemController.getOfficeItemDetailById)
		.delete(officeItemController.deleteOfficeItemById);

	router.route('/').get(officeItemController.getOfficeItemsDetail);

	return router;
};
