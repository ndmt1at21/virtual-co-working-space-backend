import config from '@src/config';
import { NotFoundError } from '@src/utils/appError';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { CreatePushTokenDto } from './@types/dto/CreatePushToken.dto';
import { PushTokenDto } from './@types/dto/PushToken.dto';
import { FindAllPushTokensOptions } from './@types/filter/FindAllPushTokensOptions';
import { IPushTokenService } from './@types/IPushTokenService';
import { PushToken } from './pushToken.entity';
import { PushTokenErrorMessages } from './pushToken.error';
import { PushTokenRepository } from './pushToken.repository';

export class PushTokenService implements IPushTokenService {
	constructor(private readonly pushTokenRepository: PushTokenRepository) {}

	async createOrUpdatePushToken(
		createPushTokenDto: CreatePushTokenDto
	): Promise<PushTokenDto> {
		const { pushToken, userId, device } = createPushTokenDto;

		const savedPushToken =
			await this.pushTokenRepository.findByTokenAndUserId(
				pushToken,
				userId
			);

		let changedPushToken: PushToken;

		if (savedPushToken) {
			changedPushToken = await this.pushTokenRepository.save({
				...savedPushToken,
				device,
				expiredAt: new Date(
					Date.now() +
						config.notification
							.NOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME
				)
			});
		}

		if (!savedPushToken) {
			changedPushToken = await this.pushTokenRepository.save({
				token: pushToken,
				userId,
				deviceType: device,
				expiredAt: new Date(
					Date.now() +
						config.notification
							.NOTIFICATION_PUSH_TOKEN_EXPIRATION_TIME
				)
			});
		}

		return {
			id: changedPushToken!.id,
			userId: changedPushToken!.userId,
			pushToken: changedPushToken!.token,
			deviceType: changedPushToken!.deviceType,
			expiredAt: changedPushToken!.expiredAt
		};
	}

	async deletePushTokenByToken(pushToken: string): Promise<void> {
		const isExisted = await this.pushTokenRepository.existsByToken(
			pushToken
		);

		if (!isExisted) {
			throw new NotFoundError(
				PushTokenErrorMessages.PUSH_TOKEN_NOT_FOUND
			);
		}

		await this.pushTokenRepository.deletePushTokenByToken(pushToken);
	}

	async findAllPushTokens(
		options: FindAllPushTokensOptions
	): Promise<[PushTokenDto[], PaginationInfo]> {
		const [pushTokens, paginationInfo] =
			await this.pushTokenRepository.findAllPushTokens(options);

		return [
			pushTokens.map(pushToken => ({
				id: pushToken.id,
				userId: pushToken.userId,
				pushToken: pushToken.token,
				deviceType: pushToken.deviceType,
				expiredAt: pushToken.expiredAt
			})),
			paginationInfo
		];
	}
}
