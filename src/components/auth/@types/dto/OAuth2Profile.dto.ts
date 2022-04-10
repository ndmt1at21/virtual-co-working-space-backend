import { UserLoginProvider } from '@src/components/UserLoginProvider';

export type OAuth2ProfileDto = {
	profileId: string;
	email: string;
	phone?: string;
	avatar: string;
	name: string;
	provider: UserLoginProvider;
};
