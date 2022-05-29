import { OfficeRoleType } from '@src/components/officeRoles/@types/OfficeRoleType';
import { RequestHandler } from 'express';

export interface IOfficeMiddleware {
	protect: RequestHandler;

	restrictTo(requiredRoles: OfficeRoleType[]): RequestHandler;

	restrictToNotBlockedOffice: RequestHandler;
}
