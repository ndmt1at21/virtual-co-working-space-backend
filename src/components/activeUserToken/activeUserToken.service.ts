import crypto from 'crypto';
import config from '@src/config';
import { IllegalArgumentError } from '@src/utils/appError';
import { ActiveTokenErrorMessages } from './activeToken.error';
import { ActiveUserTokenRepository } from './activeUserToken.repository';
import { ActiveUserTokenDto } from './@types/dto/ActiveUserToken.dto';
import { IActiveUserTokenService } from './@types/IActiveUserTokenService';

export class ActiveUserTokenService implements IActiveUserTokenService {
	constructor(
		private readonly activeUserTokenRepository: ActiveUserTokenRepository
	) {}

	createToken = async (userId: number): Promise<ActiveUserTokenDto> => {
		const token = crypto
			.randomBytes(config.auth.ACTIVE_USER_TOKEN_LENGTH)
			.toString('hex');

		const createdToken = await this.activeUserTokenRepository.save({
			userId,
			token
		});

		return { ...createdToken };
	};

	deleteToken = async (token: string): Promise<number> => {
		return await this.activeUserTokenRepository.deleteByToken(token);
	};

	validateToken = async (userId: number, token: string): Promise<boolean> => {
		const activeUserToken =
			await this.activeUserTokenRepository.findByUserIdAndToken(
				userId,
				token
			);

		if (!activeUserToken) {
			throw new IllegalArgumentError(
				ActiveTokenErrorMessages.INVALID_TOKEN
			);
		}

		return true;
	};
}
