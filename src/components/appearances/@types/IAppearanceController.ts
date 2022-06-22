import { RequestHandler } from 'express';

export interface IAppearanceController {
	createAppearance: RequestHandler;

	getAllAppearances: RequestHandler;

	getAllAppearancesOfUser: RequestHandler;

	deleteAppearance: RequestHandler;
}
