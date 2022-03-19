import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';

export const OfficeInvitationController = (
	officeInvitationService: IOfficeInvitationService
) => {
	const acceptInvitationByToken = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const deleteInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const createInvitationByEmail = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	return {
		acceptInvitationByToken,
		deleteInvitation,
		createInvitationByEmail
	};
};
