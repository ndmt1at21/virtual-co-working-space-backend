import { createOfficeController } from '@src/components/offices/office.factory';
import { Router } from 'express';

export const OfficeRouter = () => {
	const officeController = createOfficeController();

	const router = Router();

	router.route('/:id/members').get(officeController.getOfficeMembersById);

	router.route('/:id/items').get(officeController.getOfficeItemsById);

	router.route('/:id/block').patch(officeController.blockOfficeById);

	router.route('/:id/unblock').patch(officeController.unblockOfficeById);

	router.route('/:id').get(officeController.getOfficeDetailById);

	router.route('/').get(officeController.getAllOffices);

	return router;
};
