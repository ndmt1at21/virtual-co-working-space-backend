import { UserLoginProvider } from '../UserLoginProvider';

export type CreateUserExternalDto = {
	email: string;
	externalId: string;
	provider: UserLoginProvider;
	avatar: string;
	name: string;
	phone?: string;
};
