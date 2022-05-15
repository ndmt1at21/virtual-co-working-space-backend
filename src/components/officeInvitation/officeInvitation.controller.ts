import config from '@src/config';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { ILogger } from '../logger/@types/ILogger';
import { CreatePrivateInvitationDto } from './@types/dto/CreatePrivateInvitation.dto';
import { IOfficeInvitationMailQueueProducer } from './@types/IOfficeInvitationMailQueueProducer';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';

export class OfficeInvitationController {
	constructor(
		private readonly officeInvitationService: IOfficeInvitationService,
		private readonly officeInvitationMailQueueProducer: IOfficeInvitationMailQueueProducer,
		private readonly logger: ILogger
	) {}

	createOfficeInvitationByEmail = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Create office invitation with email = ${req.body.email}`
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

			this.logger.info(
				`Office invitation with id = ${officeInvitation.id} is created successfully`
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Invitation has been sent'
			});
		}
	);

	getPrivateInvitation = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Get private invitation with id = ${req.params.id}`);

		const token = req.params.inviteToken;

		const invitation =
			await this.officeInvitationService.findPrivateInvitation(
				req.user!.id,
				token
			);

		this.logger.info(
			`Private invitation with id = ${invitation.id} is found successfully`
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { invitation }
		});
	});

	getPublicInvitation = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Get public invitation with id = ${req.params.id}`);

		const officeInviteCode = req.params.inviteCode;

		const invitation =
			await this.officeInvitationService.findPublicInvitation(
				req.user!.id,
				officeInviteCode
			);

		this.logger.info(
			`Public invitation with id = ${invitation.id} is found successfully`
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { invitation }
		});
	});

	joinWithPrivateInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Join with private invitation with id = ${req.params.id}`
			);

			const token = req.params.inviteToken;

			await this.officeInvitationService.acceptPrivateInvitation(
				req.user!.id,
				token
			);

			this.logger.info(
				`User with id = ${
					req.user!.id
				} has joined with private invitation with id = ${
					req.params.id
				} successfully`
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Joined'
			});
		}
	);

	joinWithPublicInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Join office with inviteCode = ${req.params.inviteCode}`
			);

			const officeInviteCode = req.params.inviteCode;

			await this.officeInvitationService.acceptPublicInvitation(
				req.user!.id,
				officeInviteCode
			);

			this.logger.info(
				`User with id = ${
					req.user!.id
				} has joined office with inviteCode = ${
					req.params.inviteCode
				} successfully`
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Joined'
			});
		}
	);

	deleteInvitation = catchAsyncRequestHandler(async (req, res, next) => {});

	getOfficeInvitations = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Get office invitations`);

		const invitations =
			await this.officeInvitationService.findAllPrivateInvitations();

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { invitations }
		});

		this.logger.info(`Get office invitations successfully`);

		res.status(HttpStatusCode.OK).json(resData);
	});
}
