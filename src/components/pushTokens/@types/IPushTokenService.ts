import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { CreatePushTokenDto } from './dto/CreatePushToken.dto';
import { PushTokenDto } from './dto/PushToken.dto';
import { FindAllPushTokensOptions } from './filter/FindAllPushTokensOptions';

export interface IPushTokenService {
	createOrUpdatePushToken(
		createPushTokenDto: CreatePushTokenDto
	): Promise<PushTokenDto>;

	deletePushTokenByToken(pushToken: string): Promise<void>;

	findAllPushTokens(
		options: FindAllPushTokensOptions
	): Promise<[PushTokenDto[], PaginationInfo]>;
}
