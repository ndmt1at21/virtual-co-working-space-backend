import { IMailService } from './@types/IMailService';
import { MailService } from './mail.service';

export const createMailService = (): IMailService => {
	return MailService();
};
