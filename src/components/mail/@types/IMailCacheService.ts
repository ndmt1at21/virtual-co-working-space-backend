export type MailCacheOptions = {
	mailTemplateExpireSeconds?: number;
};

export interface IMailCacheService {
	setMailTemplate(
		templateUrl: string,
		content: string,
		opts?: MailCacheOptions
	): Promise<void>;

	getMailTemplate(templateUrl: string): Promise<string | null>;
}
