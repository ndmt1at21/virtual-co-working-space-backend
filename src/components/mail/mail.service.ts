import fs from 'fs';
import util from 'util';
import config from '@src/config';
import Handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';
import nodeMailer, { SentMessageInfo, Transporter } from 'nodemailer';
import { IMailService } from './@types/IMailService';
import { MailOptions } from './@types/MailOptions';
import { SentResult } from './@types/SentResult';
import { IMailCacheService } from './@types/IMailCacheService';
import { ILogger } from '../logger/@types/ILogger';

let transporter: Transporter;

export const MailService = (
	mailCache: IMailCacheService,
	logger: ILogger
): IMailService => {
	const initialize = async (): Promise<void> => {
		transporter = nodeMailer.createTransport({
			service: config.mail.EMAIL_SERVICE_NAME,
			host: config.mail.EMAIL_SERVICE_HOST,
			port: config.mail.EMAIL_SERVICE_PORT,
			secure: false,
			pool: true,
			maxMessages: Infinity,
			maxConnections: 20,
			auth: {
				user: config.mail.EMAIL_SERVICE_USERNAME,
				pass: config.mail.EMAIL_SERVICE_PASSWORD
			}
		});

		logger.info('Start verify SMTP');

		try {
			const success = await util.promisify(transporter.verify)();
			success && logger.info('SMTP ready...');
		} catch (err) {
			logger.error(`SMTP Error: ${err}`);
			logger.error('SMTP not ready!');
			throw err;
		}
	};

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

		const result = await transporter.sendMail(nodeMailerOptions);

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

		if (!htmlTemplate) throw new Error(`Template file ${url} is not found`);

		return htmlTemplate;
	}

	return { initialize, sendBulkMails, sendMail };
};
