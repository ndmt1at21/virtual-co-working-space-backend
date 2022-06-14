import { ActiveUserTokenDto } from './dto/ActiveUserToken.dto';

export interface IActiveUserTokenService {
	createToken: (userId: number, len: number) => Promise<ActiveUserTokenDto>;

	deleteToken: (token: string) => Promise<void>;

	validateAndDeserializeToken: (token: string) => Promise<number>;
}
