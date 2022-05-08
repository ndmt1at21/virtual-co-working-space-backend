import { UserLoginProvider } from '@src/components/auth/@types/UserLoginProvider';

export type CreateUserExternalDto = {
	email: string;
	externalId: string;
	provider: UserLoginProvider;
	avatar: string;
	name: string;
	phone?: string;
};
