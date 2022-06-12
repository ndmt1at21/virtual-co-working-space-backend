import { RequestHandler } from 'express';

export interface IAppearanceValidation {
	validateCreateAppearance: RequestHandler;
}
