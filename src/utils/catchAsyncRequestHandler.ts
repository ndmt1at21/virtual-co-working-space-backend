import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppError } from './appError';

type AsyncRequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<AppError | void>;

export const catchAsyncRequestHandler = (
	fn: AsyncRequestHandler
): RequestHandler => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			next(err);
		}
	};
};
