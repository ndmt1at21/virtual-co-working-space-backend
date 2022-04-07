import { UserRoleType } from '@src/components/users/@types/UserRoleType';
import { RequestHandler } from 'express';

export interface IAuthMiddleware {
	protect: RequestHandler;

	restrictToGuest: RequestHandler;

	restrictToEmailVerified: RequestHandler;

	restrictTo: (roles: UserRoleType[]) => RequestHandler;
}
