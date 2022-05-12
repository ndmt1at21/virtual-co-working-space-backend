import config from '@src/config';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreatePrivateInvitationDto } from './@types/dto/CreatePrivateInvitation.dto';
import { IOfficeInvitationMailQueueProducer } from './@types/IOfficeInvitationMailQueueProducer';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';

export class OfficeInvitationController {
	constructor(
		private readonly officeInvitationService: IOfficeInvitationService,
		private readonly officeInvitationMailQueueProducer: IOfficeInvitationMailQueueProducer
	) {}

	createOfficeInvitationByEmail = catchAsyncRequestHandler(
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
				await this.officeInvitationService.createPrivateInvitation({
					...createInvitationDto,
					inviterId: req.user!.id
				});

			const clientUrl = config.app.CLIENT_DOMAIN;
			this.officeInvitationMailQueueProducer.addPrivateOfficeInviteJob(
				officeInvitation,
				clientUrl
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Invitation has been sent'
			});
		}
	);

	getPrivateInvitation = catchAsyncRequestHandler(async (req, res, next) => {
		const token = req.params.inviteToken;

		const invitation =
			await this.officeInvitationService.findPrivateInvitation(
				req.user!.id,
				token
			);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { invitation }
		});
	});

	getPublicInvitation = catchAsyncRequestHandler(async (req, res, next) => {
		const officeInviteCode = req.params.inviteCode;

		const invitation =
			await this.officeInvitationService.findPublicInvitation(
				req.user!.id,
				officeInviteCode
			);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { invitation }
		});
	});

	joinWithPrivateInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			const token = req.params.inviteToken;

			await this.officeInvitationService.acceptPrivateInvitation(
				req.user!.id,
				token
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Joined'
			});
		}
	);

	joinWithPublicInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			const officeInviteCode = req.params.inviteCode;

			await this.officeInvitationService.acceptPublicInvitation(
				req.user!.id,
				officeInviteCode
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Joined'
			});
		}
	);

	deleteInvitation = catchAsyncRequestHandler(async (req, res, next) => {});
}
