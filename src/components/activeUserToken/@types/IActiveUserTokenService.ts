import { ActiveUserTokenDto } from './dto/ActiveUserToken.dto';

export interface IActiveUserTokenService {
	createToken: (userId: string) => Promise<ActiveUserTokenDto>;

	deleteToken: (token: string) => Promise<number>;

	validateToken: (userId: string, token: string) => Promise<boolean>;
}
