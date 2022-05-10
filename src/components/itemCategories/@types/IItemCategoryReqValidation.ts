import { RequestHandler } from 'express';

export interface IItemCategoryReqValidation {
	validateCreateItemCategoryDto: RequestHandler;

	validateUpdateItemCategoryDto: RequestHandler;
}
