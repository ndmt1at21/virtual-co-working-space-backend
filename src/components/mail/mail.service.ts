import fs from 'fs';
import util from 'util';
import config from '@src/config';
import Handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';
import nodeMailer, { SentMessageInfo } from 'nodemailer';
import { IMailService } from './@types/IMailService';
import { MailOptions } from './@types/MailOptions';
import { SentResult } from './@types/SentResult';
import { IMailCacheService } from './@types/IMailCacheService';

export const MailService = (mailCache: IMailCacheService): IMailService => {
	const transporter = nodeMailer.createTransport({
		service: config.mail.EMAIL_SERVICE_NAME,
		host: config.mail.EMAIL_SERVICE_HOST,
		port: config.mail.EMAIL_SERVICE_PORT,
		secure: true,
		pool: true,
		maxMessages: Infinity,
		maxConnections: 20,
		auth: {
			user: config.mail.EMAIL_SERVICE_USERNAME,
			pass: config.mail.EMAIL_SERVICE_PASSWORD
		}
	});

	const sendBulkMails = async (options: MailOptions[]): Promise<void> => {
		options.map(async opt => await sendMail(opt));
	};

	const sendMail = async (option: MailOptions): Promise<SentResult> => {
		const { from, to, context, subject, templateUrl } = option;

		const htmlTemplate = await getHtmlTemplate(templateUrl);
		const compiledTemplate = Handlebars.compile(htmlTemplate);
		const renderedTemplate = compiledTemplate({ ...context });

		const nodeMailerOptions: Mail.Options = {
			from: from,
			to: to,
			subject: subject,
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

	async function getHtmlTemplate(url: string): Promise<string> {
		const htmlTemplateCached = await mailCache.getMailTemplate(url);

		if (htmlTemplateCached) {
			return htmlTemplateCached;
		}

		const htmlTemplate = fs.readFileSync(url).toString();
		return htmlTemplate;
	}

	return { sendBulkMails, sendMail };
};
