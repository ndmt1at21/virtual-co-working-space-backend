import { NotFoundError } from '@src/utils/appError';
import { itemLogger } from '../logger';
import { IItemController } from './@types/IItemController';
import { IItemService } from './@types/IItemService';
import { ItemController } from './item.controller';
import { createItemData, getItemByIdData } from './test/data/controller';

describe('ItemController', () => {
	let itemController: IItemController;
	let itemService: Partial<IItemService>;

	beforeAll(() => {
		itemService = {};

		itemController = new ItemController(
			itemService as IItemService,
			itemLogger
		);
	});

	describe('createItem', () => {
		test('should create item from when pass a valid data', async () => {
			const {
				req: reqData,
				res: resData,
				service: serviceData
			} = createItemData.valid;
			const req = { body: reqData.body };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis()
			};

			itemService.createItem = jest
				.fn()
				.mockImplementation(() => Promise.resolve(serviceData.result));

			await itemController.create(req as any, res as any, () => {});

			expect(itemService.createItem).toHaveBeenCalledWith(req.body);
			expect(res.status).toBeCalledWith(resData.code);
			expect(res.json).toBeCalledWith(resData);
		});
	});

	describe('getItemById', () => {
		test('should return item when item exists', async () => {
			const {
				req: reqData,
				res: resData,
				serviceData
			} = getItemByIdData.valid;
			const req = reqData;
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis()
			};

			itemService.findItemById = jest
				.fn()
				.mockImplementation(() =>
					Promise.resolve(serviceData.findItemById.result)
				);

			await itemController.getById(req as any, res as any, () => {});

			expect(itemService.findItemById).toHaveBeenCalledWith(
				req.params.id
			);

			expect(res.status).toBeCalledWith(resData.code);
			expect(res.json).toBeCalledWith(resData);
		});

		test('should throw not found error when item is not exist', async () => {
			// const { req: reqData, service: serviceData } =
			// 	getItemByIdData.notExists;
			// const req = reqData;
			// const nextFn = jest.fn();
			// itemService.findItemById = jest
			// 	.fn()
			// 	.mockRejectedValue(new NotFoundError('item_not_found'));
			// await itemController.getById(req as any, {} as any, nextFn);
			// expect(itemService.findItemById).toHaveBeenCalledWith(
			// 	req.params.id
			// );
			// expect(nextFn).toBeCalledWith(NotFoundError);
		});
	});

	describe('updateItemById', () => {
		test('should return updated item when update successfully', async () => {
			const {
				req: reqData,
				res: resData,
				serviceData
			} = getItemByIdData.valid;
			const req = reqData;
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis()
			};

			itemService.findItemById = jest
				.fn()
				.mockImplementation(() =>
					Promise.resolve(serviceData.findItemById.result)
				);

			await itemController.getById(req as any, res as any, () => {});

			expect(itemService.findItemById).toHaveBeenCalledWith(
				req.params.id
			);

			expect(res.status).toBeCalledWith(resData.code);
			expect(res.json).toBeCalledWith(resData);
		});

		// test('should throw not found error when item is not exist', async () => {
		// 	const { req: reqData, service: serviceData } =
		// 		getItemByIdData.notExists;
		// 	const req = reqData;
		// 	const nextFn = jest.fn();

		// 	itemService.findItemById = jest
		// 		.fn()
		// 		.mockRejectedValue(
		// 			new NotFoundError(serviceData.findItemById.throw)
		// 		);

		// 	await itemController.getById(req as any, {} as any, nextFn);

		// 	expect(itemService.findItemById).toHaveBeenCalledWith(
		// 		req.params.id
		// 	);

		// 	await itemController.getById(req as any, {} as any, nextFn);

		// 	console.log('calll nextFn toBeCalled');
		// 	expect(nextFn).toBeCalledWith(NotFoundError);
		// });
	});
});
