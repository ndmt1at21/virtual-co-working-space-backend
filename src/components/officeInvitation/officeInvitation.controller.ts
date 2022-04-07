import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import {
	CreateOfficeInvitationByEmailDto,
	CreatePublicOfficeInvitationDto
} from './@types/dto/CreateOfficeInvitation.dto';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';

export const OfficeInvitationController = (
	officeInvitationService: IOfficeInvitationService
) => {
	const createPublicInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(
				CreatePublicOfficeInvitationDto,
				req.body
			);
			if (errors.length > 0)
				throw new IllegalArgumentError('Invalid request body', errors);

			const createOfficeInvitationDto =
				req.body as CreatePublicOfficeInvitationDto;

			const officeInvitation =
				await officeInvitationService.createPublicOfficeInvitation(
					createOfficeInvitationDto
				);

			res.status(HttpStatusCode.OK).json({
				data: {
					invitation: officeInvitation
				}
			});

			req.officeInvitation
		}
	);

	const createInvitationByEmail = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(
				CreateOfficeInvitationByEmailDto,
				req.body
			);
			if (errors.length > 0)
				throw new IllegalArgumentError('Invalid request body', errors);

			const createOfficeInvitationDto =
				req.body as CreateOfficeInvitationByEmailDto;

			const officeInvitation =
				await officeInvitationService.createOfficeInvitationByEmail(
					createOfficeInvitationDto
				);

			res.status(HttpStatusCode.OK).json({
				data: {
					invitation: officeInvitation
				}
			});
		}
	);

	const getInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const acceptInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const deleteInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	return {
		getInvitation,
		acceptInvitation,
		deleteInvitation,
		createPublicInvitation,
		createInvitationByEmail
	};
};
