import { NextFunction, Request, Response } from 'express';
import { ILogger } from '@src/@types/ILogger';

export const requestLoggerMiddleware = (logger: ILogger) => {
	return (req: Request, res: Response, next: NextFunction) => {
		logger.info(`${req.method} ${req.url}: ${req.ip}`);
		next();
	};
};
