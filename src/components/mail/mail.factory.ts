import { getCacheConnection } from '../app/loaders/database/cache';
import { mailLogger } from '../logger';
import { IMailCacheService } from './@types/IMailCacheService';
import { IMailService } from './@types/IMailService';
import { MailCacheService } from './mail.cache';
import { MailService } from './mail.service';

export const createMailService = (): IMailService => {
	const mailCache = createMailCacheService();
	return new MailService(mailCache, mailLogger);
};

export function createMailCacheService(): IMailCacheService {
	return new MailCacheService(getCacheConnection('mail'));
}
