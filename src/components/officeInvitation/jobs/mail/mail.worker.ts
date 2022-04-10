import path from 'path';
import { Queue } from 'bull';
import { ILogger } from '@src/components/logger/@types/ILogger';
import { IMailService } from '@src/components/mail/@types/IMailService';
import { OfficeInvitationDto } from '../../@types/dto/OfficeInvitation.dto';

export const OfficeInvitationMailWorker = (
	queue: Queue,
	mailService: IMailService,
	logger: ILogger
) => {
	const load = () => {
		loadPrivateOfficeInviteJob();
	};

	function loadPrivateOfficeInviteJob() {
		queue.process('invitation', 10, async job => {
			const officeInvitation = job.data.invitation as OfficeInvitationDto;
			const clientUrl = job.data.clientUrl as string;

			if (!officeInvitation) {
				const err = 'Office invitation is not defined';

				logger.error(err);
				throw new Error(err);
			}

			logger.info(
				`Start sending office invitation to ${officeInvitation.invitedEmail}`
			);

			const result = await mailService.sendMail({
				from: 'ViSpace <noreply@authentication.vispace.tech>',
				to: officeInvitation.invitedEmail!,
				subject: 'You have been invited to join a ViSpace office',
				templateUrl: path.resolve(
					'src/components/mailTemplates/privateInvitation.html'
				),
				context: {
					invitationUrl: `${clientUrl}/invites/token/${officeInvitation.token!}`
				}
			});

			logger.info(
				`Invitation link has sent to ${officeInvitation.invitedEmail} successfully`
			);
		});
	}

	return { load };
};
