import { getCacheConnection } from '../app/loaders/database/cache';
import { IMailCacheService } from './@types/IMailCacheService';
import { IMailService } from './@types/IMailService';
import { MailCacheService } from './cache.service';
import { MailService } from './mail.service';

export const createMailService = (): IMailService => {
	const mailCache = createMailCacheService();
	return MailService(mailCache);
};

export function createMailCacheService(): IMailCacheService {
	return MailCacheService(getCacheConnection('mail'));
}
