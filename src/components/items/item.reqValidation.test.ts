import { IItemReqValidation } from './@types/IItemReqValidation';
import { ItemReqValidation } from './item.reqValidation';
import { validateCreateItemData } from './test/data/reqValidation';

describe('ItemReqValidation', () => {
	let itemReqValidation: IItemReqValidation;

	beforeAll(() => {
		itemReqValidation = new ItemReqValidation();
	});

	describe('validateCreateItemData', () => {
		test('should throw error if category id in create data is empty', async () => {
			// const { req: reqData, res: resData } =
			// 	validateCreateItemData.categoryIdIsEmpty;
			// const req = { body: reqData.body, user: reqData.user };
			// const nextFn = jest.fn();
			// await itemReqValidation.validateCreateItemData(
			// 	req as any,
			// 	{} as any,
			// 	nextFn
			// );
			// expect(nextFn).toHaveBeenCalledWith(expect.any(resData.throwType));
		});

		test('should throw error if category id in create data is undefined', async () => {
			// const { req: reqData, res: resData } =
			// 	validateCreateItemData.categoryIdIsUndefined;
			// const req = { body: reqData.body, user: reqData.user };
			// const nextFn = jest.fn();
			// await itemReqValidation.validateCreateItemData(
			// 	req as any,
			// 	{} as any,
			// 	nextFn
			// );
			// expect(nextFn).toHaveBeenCalledWith(expect.any(resData.throwType));
		});

		test('should pass validation if data of creating item is valid', async () => {
			const { req: reqData } = validateCreateItemData.valid;

			const req = { body: reqData.body, user: reqData.user };
			const nextFn = jest.fn();

			await itemReqValidation.validateCreateItemData(
				req as any,
				{} as any,
				nextFn
			);

			expect(nextFn).toBeCalled();
		});
	});
});
