import { OfficeRoleType } from '@src/components/officeRoles/@types/OfficeRoleType';
import { RequestHandler } from 'express';

export interface IOfficeMiddleware {
	deserializeOfficeFromParams: RequestHandler;

	restrictTo(requiredRoles: OfficeRoleType[]): RequestHandler;
}
