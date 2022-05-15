import { RequestHandler } from 'express';

export interface IItemReqValidation {
	validateCreateItemData: RequestHandler;
	validateUpdateItemData: RequestHandler;
	validateItemId: RequestHandler;
}
