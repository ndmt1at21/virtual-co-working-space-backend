import { appConfig } from '@src/config/app';
import { ErrorRequestHandler } from 'express';
import { globalErrorHandlerDev } from './globalErrorHandlerDev';
import { globalErrorHandlerProd } from './globalErrorHandlerProd';

export const globalErrorHandler: ErrorRequestHandler = (
	err: Error,
	req,
	res,
	next
) => {
	if (appConfig.NODE_ENV === 'production') {
		globalErrorHandlerProd(err, req, res, next);
	}

	if (appConfig.NODE_ENV === 'development') {
		globalErrorHandlerDev(err, req, res, next);
	}
};
