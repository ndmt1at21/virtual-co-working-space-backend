import { RequestHandler } from 'express';

export interface IOfficeInvitationReqValidation {
	validateCreatePrivateOfficeInvitation: RequestHandler;
}
