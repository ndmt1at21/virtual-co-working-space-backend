import { UserRoleType } from '@src/components/users/@types/UserRoleType';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthErrorMessages } from '../auth.error';

export interface IAuthMiddleware {
	deserializeUser: RequestHandler;

	protect: RequestHandler;

	restrictToGuest: RequestHandler;

	restrictTo: (roles: UserRoleType[]) => RequestHandler;
}
