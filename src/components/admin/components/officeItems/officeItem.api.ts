import { createOfficeItemController } from '@src/components/officeItems/officeItem.factory';
import { Router } from 'express';

export const OfficeItemRouter = () => {
	const router = Router();
	const officeItemController = createOfficeItemController();

	router.route('/:id').get(officeItemController.getOfficeItemDetailById);

	router.route('/').get(officeItemController.getOfficeItemsDetail);

	return router;
};
