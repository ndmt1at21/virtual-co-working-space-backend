import express from 'express';
import { IAuthMiddleware } from '../auth/@types/IAuthMiddleware';
import { IAppearanceController } from './@types/IAppearanceController';
import { IAppearanceValidation } from './@types/IAppearanceReqValidation';
import { AppearanceRouter } from './appearance.api';

describe('AppearanceRouter', () => {
	let spyRouter: jest.SpyInstance = jest.spyOn(express, 'Router');
	let authMiddleware: Partial<IAuthMiddleware>;
	let appearanceController: Partial<IAppearanceController>;
	let appearanceReqValidation: Partial<IAppearanceValidation>;

	let router: {
		use: jest.Mock<any, any>;
		post: jest.Mock<any, any>;
		get: jest.Mock<any, any>;
		route: jest.Mock<any, any>;
	};

	beforeAll(() => {
		authMiddleware = {
			protect: jest.fn()
		};

		appearanceController = {
			createAppearance: jest.fn(),
			getAllAppearances: jest.fn(),
			getAllAppearancesOfUser: jest.fn()
		};

		appearanceReqValidation = {
			validateCreateAppearance: jest.fn()
		};

		router = {
			use: jest.fn(),
			post: jest.fn(),
			get: jest.fn(),
			route: jest.fn()
		};
	});

	beforeEach(() => {
		spyRouter.mockClear();

		const { use, route, get, post } = router;

		spyRouter.mockReturnValue({
			use,
			route: route.mockReturnValue({
				post: post.mockReturnThis(),
				get: get.mockReturnThis()
			})
		});
	});

	test('should use protect middleware in any request', () => {
		const { use } = router;

		const appearanceRouter = AppearanceRouter(
			authMiddleware as IAuthMiddleware,
			appearanceController as IAppearanceController,
			appearanceReqValidation as IAppearanceValidation
		);

		expect(use).toHaveBeenCalledWith(authMiddleware.protect);
		expect(appearanceRouter).toBeDefined();
	});

	test('should use GET route to get accessories in controller when route equal to "/"', () => {
		const { route, get } = router;

		const appearanceRouter = AppearanceRouter(
			authMiddleware as IAuthMiddleware,
			appearanceController as IAppearanceController,
			appearanceReqValidation as IAppearanceValidation
		);

		expect(appearanceRouter).toBeDefined();
		expect(route).toHaveBeenCalledWith('/');
		expect(get).toHaveBeenCalledWith(
			appearanceController.getAllAppearancesOfUser
		);
	});

	test('should use POST route to create accessory in controller when route equal to "/"', () => {
		const { route, post } = router;

		const appearanceRouter = AppearanceRouter(
			authMiddleware as IAuthMiddleware,
			appearanceController as IAppearanceController,
			appearanceReqValidation as IAppearanceValidation
		);

		expect(appearanceRouter).toBeDefined();
		expect(route).toHaveBeenCalledWith('/');
		expect(post).toHaveBeenCalledWith(
			appearanceReqValidation.validateCreateAppearance,
			appearanceController.createAppearance
		);
	});
});
