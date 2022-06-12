import { RequestHandler } from 'express';

export interface IAppearanceController {
	createAppearance: RequestHandler;

	getAllAccessories: RequestHandler;

	getAllAccessoriesOfUser: RequestHandler;

	deleteAppearance: RequestHandler;
}
