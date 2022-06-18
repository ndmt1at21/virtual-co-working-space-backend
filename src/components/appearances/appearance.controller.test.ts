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
			// const res = {
			// 	status: jest.fn().mockReturnThis(),
			// 	json: jest.fn().mockReturnThis()
			// };
			// appearanceService.createAppearance = jest
			// 	.fn()
			// 	.mockResolvedValue(serviceData.result.appearances);
			// await appearanceController.createAppearance(
			// 	req as any,
			// 	res as any,
			// 	jest.fn()
			// );
			// console.log('resData', resData);
			// expect(appearanceService.createAppearance).toHaveBeenCalledWith(
			// 	serviceData.arg
			// );
			// expect(res.status).toHaveBeenCalled();
			// // expect(res.json).toBeCalledWith(resData);
		});
	});

	test('should use protect middleware in any request', () => {});
});
