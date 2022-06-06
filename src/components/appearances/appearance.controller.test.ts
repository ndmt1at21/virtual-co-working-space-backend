import { IAppearanceController } from './@types/IAppearanceController';
import { IAppearanceService } from './@types/IAppearanceService';
import { AppearanceController } from './appearance.controller';
import { Request, Response } from 'express';
import { createAppearanceData } from './test/data/controller';
import { HttpStatusCode } from '@src/constant/httpStatusCode';

describe('AppearanceController', () => {
	let appearanceController: IAppearanceController;
	let appearanceService: IAppearanceService;

	beforeAll(() => {
		appearanceService = {
			createAppearance: jest.fn(),
			deleteAppearanceById: jest.fn(),
			findAccessories: jest.fn(),
			findAllAccessoriesOfUser: jest.fn(),
			findAllAccessoriesInOffice: jest.fn()
		};

		appearanceController = new AppearanceController(
			appearanceService as IAppearanceService
		);
	});

	describe('createAppearance', () => {
		test('should create appearance from when pass a valid data', async () => {
			// const {
			// 	req: reqData,
			// 	res: resData,
			// 	service: serviceData
			// } = createAppearanceData.valid;
			// const bodyData = reqData.body;
			// const reqUser = reqData.user;
			// const req = { body: bodyData, user: reqUser };
			// const status = jest.fn();
			// const json = jest.fn();
			// const res = {
			// 	status: status.mockReturnThis(),
			// 	json: json.mockReturnThis()
			// };
			// appearanceService.createAppearance = jest
			// 	.fn()
			// 	.mockResolvedValue(serviceData.result);
			// await appearanceController.createAppearance(
			// 	req as Request,
			// 	res as any as Response,
			// 	jest.fn()
			// );
			// expect(appearanceService.createAppearance).toHaveBeenCalledWith(
			// 	serviceData.arg
			// );
			// expect(status).toBeCalled();
			// // expect(json).toHaveBeenCalledWith(resData.data);
		});
	});

	test('should use protect middleware in any request', () => {});
});
