import { RedisClientType } from 'redis';
import {
	IMailCacheService,
	MailCacheOptions
} from './@types/IMailCacheService';

export class MailCacheService implements IMailCacheService {
	private readonly PREFIX = 'mail_template';

	constructor(private readonly cacheConnection: RedisClientType) {}

	setMailTemplate = async (
		templateUrl: string,
		content: string,
		opts?: MailCacheOptions
	) => {
		await this.cacheConnection.set(
			`${this.PREFIX}:${templateUrl}`,
			content,
			{
				EX: opts?.mailTemplateExpireSeconds || 30 * 60
			}
		);
	};

	getMailTemplate = async (templateUrl: string): Promise<string | null> => {
		const result = await this.cacheConnection.get(
			`${this.PREFIX}:${templateUrl}`
		);
		return result;
	};
}
