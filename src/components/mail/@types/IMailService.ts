import { MailOptions } from './MailOptions';
import { SentResult } from './SentResult';

export interface IMailService {
	sendMail(mail: MailOptions): Promise<SentResult>;

	sendBulkMails(options: MailOptions[]): Promise<void>;
}
