import config from '@src/config';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreatePrivateInvitationDto } from './@types/dto/CreatePrivateInvitation.dto';
import { IOfficeInvitationMailQueueProducer } from './@types/IOfficeInvitationMailQueueProducer';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';

export const OfficeInvitationController = (
	officeInvitationService: IOfficeInvitationService,
	officeInvitationMailQueueProducer: IOfficeInvitationMailQueueProducer
) => {
	const createOfficeInvitationByEmail = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(
				CreatePrivateInvitationDto,
				req.body
			);

			if (errors.length > 0)
				throw new IllegalArgumentError(
					'Invalid invitation data',
					errors
				);

			const createInvitationDto = req.body as CreatePrivateInvitationDto;

			const officeInvitation =
				await officeInvitationService.createPrivateInvitation({
					...createInvitationDto,
					inviterId: req.user!.id
				});

			const clientUrl = config.app.CLIENT_DOMAIN;
			officeInvitationMailQueueProducer.addPrivateOfficeInviteJob(
				officeInvitation,
				clientUrl
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Invitation has been sent'
			});
		}
	);

	const getPrivateInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			const token = req.params.inviteToken;

			const invitation =
				await officeInvitationService.findPrivateInvitation(
					req.user!.id,
					token
				);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { invitation }
			});
		}
	);

	const getPublicInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			const officeInviteCode = req.params.inviteCode;

			const invitation =
				await officeInvitationService.findPublicInvitation(
					req.user!.id,
					officeInviteCode
				);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { invitation }
			});
		}
	);

	const joinWithPrivateInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			const token = req.params.inviteToken;

			await officeInvitationService.acceptPrivateInvitation(
				req.user!.id,
				token
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Joined'
			});
		}
	);

	const joinWithPublicInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			const officeInviteCode = req.params.inviteCode;

			await officeInvitationService.acceptPublicInvitation(
				req.user!.id,
				officeInviteCode
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Joined'
			});
		}
	);

	const deleteInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	return {
		createOfficeInvitationByEmail,
		getPrivateInvitation,
		getPublicInvitation,
		joinWithPrivateInvitation,
		joinWithPublicInvitation,
		deleteInvitation
	};
};
