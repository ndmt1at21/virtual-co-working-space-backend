import { ActiveUserTokenDto } from './dto/ActiveUserToken.dto';

export interface IActiveUserTokenService {
	createToken: (userId: number) => Promise<ActiveUserTokenDto>;

	deleteToken: (token: string) => Promise<number>;

	validateToken: (userId: number, token: string) => Promise<boolean>;
}
