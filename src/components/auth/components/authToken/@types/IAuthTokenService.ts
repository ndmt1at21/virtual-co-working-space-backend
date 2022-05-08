import { CredentialsDto } from '@src/components/auth/@types/dto/Credentials.dto';
import jwt from 'jsonwebtoken';

export interface IAuthTokenService {
	createAccessTokenAndRefreshToken: (
		userId: number
	) => Promise<[string, string]>;

	createAccessToken: (userId: number) => string;

	createRefreshToken: (userId: number) => Promise<string>;

	decodedAccessToken: (token: string) => Promise<jwt.JwtPayload>;

	blockRefreshToken: (refreshToken: string) => Promise<void>;

	deleteRefreshToken: (refreshToken: string) => Promise<void>;

	validateAccessToken: (token: string) => Promise<boolean>;

	renewCredentialByRefreshToken: (
		refreshToken: string
	) => Promise<CredentialsDto>;
}
