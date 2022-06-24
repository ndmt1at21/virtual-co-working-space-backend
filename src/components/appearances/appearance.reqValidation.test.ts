import { IAppearanceValidation } from './@types/IAppearanceReqValidation';
import { AppearanceReqValidation } from './appearance.reqValidation';
import { validateCreateAppearanceData } from './test/data/reqValidation';

describe('AppearanceReqValidation', () => {
	let appearanceReqValidation: IAppearanceValidation;

	beforeAll(() => {
		appearanceReqValidation = new AppearanceReqValidation();
	});

	describe('validateCreateAppearance', () => {
		test('should throw error if data for creating appearances is not an array', async () => {
			const { req: reqData, res: resData } =
				validateCreateAppearanceData.appearancesArrIsEmpty;

			const req = { body: reqData.body, user: reqData.user };
			const nextFn = jest.fn();

			await appearanceReqValidation.validateCreateAppearance(
				req as any,
				{} as any,
				nextFn
			);

			expect(nextFn).toHaveBeenCalledWith(expect.any(resData.errorType));
		});

		test('should throw error if appearances array has one invalid element', async () => {
			const { req: reqData, res: resData } =
				validateCreateAppearanceData.appearancesArrIsInvalid;

			const req = { body: reqData.body, user: reqData.user };
			const nextFn = jest.fn();

			await appearanceReqValidation.validateCreateAppearance(
				req as any,
				{} as any,
				nextFn
			);

			expect(nextFn).toHaveBeenCalledWith(expect.any(resData.errorType));
		});

		test('should pass validation if data of creating appearances is valid', async () => {
			const { req: reqData } = validateCreateAppearanceData.valid;

			const req = { body: reqData.body, user: reqData.user };
			const nextFn = jest.fn();

			await appearanceReqValidation.validateCreateAppearance(
				req as any,
				{} as any,
				nextFn
			);

			expect(nextFn).toBeCalled();
		});
	});
});
