import { IAppearanceService } from './@types/IAppearanceService';
import { AppearanceController } from './appearance.controller';
import { Request, Response } from 'express';
import {
	createAppearanceData,
	getAllAppearancesOfUser
} from './test/data/controller';
import { IAppearanceController } from './@types/IAppearanceController';

describe('AppearanceController', () => {
	let appearanceController: IAppearanceController;
	let appearanceService: Partial<IAppearanceService>;

	beforeAll(() => {
		appearanceService = {
			createAppearance: jest.fn(),
			deleteAppearanceById: jest.fn(),
			findAppearances: jest.fn(),
			findAllAppearancesOfUser: jest.fn(),
			findAllAppearancesInOffice: jest.fn()
		};

		appearanceController = new AppearanceController(
			appearanceService as IAppearanceService
		);
	});

	describe('createAppearance', () => {
		test('should create appearance from when pass a valid data', async () => {
			const {
				req: reqData,
				res: resData,
				service: serviceData
			} = createAppearanceData.valid;
			const req = { body: reqData.body, user: reqData.user };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis()
			};

			appearanceService.createAppearance = jest
				.fn()
				.mockImplementation(() => Promise.resolve(serviceData.result));

			await appearanceController.createAppearance(
				req as Request,
				res as any as Response,
				() => {}
			);

			expect(appearanceService.createAppearance).toHaveBeenCalledWith(
				serviceData.arg
			);
			expect(res.status).toBeCalledWith(resData.code);
			expect(res.json).toBeCalledWith(resData);
		});
	});

	describe('getAllAppearancesOfUser', () => {
		test('should get all appearances of user', async () => {
			const {
				service: serviceData,
				res: resData,
				req: reqData
			} = getAllAppearancesOfUser;

			const req = { user: reqData.user };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis()
			};

			appearanceService.findAllAppearancesOfUser = jest
				.fn()
				.mockImplementation(() => Promise.resolve(serviceData.result));

			await appearanceController.getAllAppearancesOfUser(
				req as any,
				res as any,
				() => {}
			);

			expect(appearanceService.findAllAppearancesOfUser).toBeCalledWith(
				req.user.id
			);
			expect(res.status).toBeCalledWith(resData.code);
			expect(res.json).toBeCalledWith(resData);
		});
	});
});
