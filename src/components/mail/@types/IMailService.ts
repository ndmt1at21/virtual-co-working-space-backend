import { MailOptions } from './MailOptions';
import { SentResult } from './SentResult';

export interface IMailService {
	sendEmail(mail: MailOptions): Promise<SentResult>;
}
