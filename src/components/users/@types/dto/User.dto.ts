export type UserDto = {
	id: string;
	name: string;
	email: string;
	phone?: string;
	avatar?: string;
	provider: string;
	externalId?: string;
	status: string;
	createdAt: Date;
};
