import fs from 'fs';
import util from 'util';
import config from '@src/config';
import Handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';
import nodeMailer, { SentMessageInfo } from 'nodemailer';
import { IMailService } from './@types/IMailService';
import { MailOptions } from './@types/MailOptions';
import { SentResult } from './@types/SentResult';

export const MailService = (): IMailService => {
	const sendEmail = async (mailOptions: MailOptions): Promise<SentResult> => {
		const transporter = nodeMailer.createTransport({
			service: config.mail.EMAIL_SERVICE_NAME,
			host: config.mail.EMAIL_SERVICE_HOST,
			port: config.mail.EMAIL_SERVICE_PORT,
			secure: true,
			auth: {
				user: config.mail.EMAIL_SERVICE_USERNAME,
				pass: config.mail.EMAIL_SERVICE_PASSWORD
			}
		});

		const htmlTemplate = fs
			.readFileSync(mailOptions.templateUrl)
			.toString();

		const compiledTemplate = Handlebars.compile(htmlTemplate);
		const renderedTemplate = compiledTemplate({ ...mailOptions.context });

		const nodeMailerOptions: Mail.Options = {
			from: mailOptions.from,
			to: mailOptions.to,
			subject: mailOptions.subject,
			html: renderedTemplate
		};

		const result = (await util.promisify(transporter.sendMail)(
			nodeMailerOptions
		)) as SentMessageInfo;

		return {
			acceptedRecipients: result.accepted,
			rejectedRecipients: result.rejected,
			response: result.response
		};
	};

	return { sendEmail };
};
