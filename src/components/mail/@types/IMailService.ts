import { MailOptions } from './MailOptions';
import { SentResult } from './SentResult';

export interface IMailService {
	initialize(): Promise<void>;

	sendMail(mail: MailOptions): Promise<SentResult>;

	sendBulkMails(options: MailOptions[]): Promise<void>;
}
