import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { NextFunction, Request, Response } from 'express';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';

export const OfficeInvitationController = (
	officeInvitationService: IOfficeInvitationService
) => {
	const getInvitation = catchAsyncRequestHandler(async (req, res, next) => {
		const { token, code } = req.query;

		if (token) {
			getInvitationByInvitationToken(token as string, req, res, next);
		}

		if (code) {
			getInvitationByInvitationCode(code as string, req, res, next);
		}
	});

	const acceptInvitationByInvitationToken = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const acceptInvitationByOfficeInvitationCode = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const deleteInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const createInvitationByEmail = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	async function getInvitationByInvitationToken(
		token: string | undefined,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		if (!token)
			throw new IllegalArgumentError('Invitation token is required');

		// const invitationDto =
		// 	await officeInvitationService.getInvitationInformationByInvitationToken(
		// 		token
		// 	);

		// res.status(HttpStatusCode.OK).json({
		// 	data: {
		// 		invitation: invitationDto
		// 	}
		// });
	}

	async function getInvitationByInvitationCode(
		code: string | undefined,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		if (!code)
			throw new IllegalArgumentError('Invitation code is required');

		// const invitationDto =
		// 	await officeInvitationService.getInvitationInformationByOfficeInvitationCode(
		// 		code
		// 	);

		// res.status(HttpStatusCode.OK).json({
		// 	data: {
		// 		invitation: invitationDto
		// 	}
		// });
	}

	return {
		getInvitation,
		acceptInvitationByInvitationToken,
		deleteInvitation,
		createInvitationByEmail
	};
};
