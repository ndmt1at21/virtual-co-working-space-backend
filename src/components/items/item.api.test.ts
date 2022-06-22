import { Router } from 'express';
import { IAuthMiddleware } from '../auth/@types/IAuthMiddleware';
import { IItemController } from './@types/IItemController';
import { IItemReqValidation } from './@types/IItemReqValidation';
import { ItemRouter } from './item.api';

jest.mock('express');

describe('ItemRouter', () => {
	let routerSpy: jest.SpyInstance;
	let authMiddleware: Partial<IAuthMiddleware>;
	let itemRouter: Router;
	let itemController: Partial<IItemController>;
	let itemReqValidation: Partial<IItemReqValidation>;

	test('', () => {});
});
