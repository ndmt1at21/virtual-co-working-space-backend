import { RedisClientType } from 'redis';
import {
	IMailCacheService,
	MailCacheOptions
} from './@types/IMailCacheService';

export const MailCacheService = (
	cacheConnection: RedisClientType
): IMailCacheService => {
	const PREFIX = 'mail_template';

	const setMailTemplate = async (
		templateUrl: string,
		content: string,
		opts?: MailCacheOptions
	) => {
		await cacheConnection.set(`${PREFIX}:${templateUrl}`, content, {
			EX: opts?.mailTemplateExpireSeconds || 30 * 60
		});
	};

	const getMailTemplate = async (
		templateUrl: string
	): Promise<string | null> => {
		return await cacheConnection.get(`${PREFIX}:${templateUrl}`);
	};

	return { setMailTemplate, getMailTemplate };
};
