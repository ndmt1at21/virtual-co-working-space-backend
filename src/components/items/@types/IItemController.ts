import { RequestHandler } from 'express';

export interface IItemController {
	create: RequestHandler;
	getById: RequestHandler;
	getAll: RequestHandler;
	updateById: RequestHandler;
	deleteById: RequestHandler;
}
