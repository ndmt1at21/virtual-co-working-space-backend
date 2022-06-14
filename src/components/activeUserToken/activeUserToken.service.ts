import crypto from 'crypto';
import { IllegalArgumentError } from '@src/utils/appError';
import { ActiveTokenErrorMessages } from './activeUserToken.error';
import { ActiveUserTokenRepository } from './activeUserToken.repository';
import { ActiveUserTokenDto } from './@types/dto/ActiveUserToken.dto';
import { IActiveUserTokenService } from './@types/IActiveUserTokenService';

export class ActiveUserTokenService implements IActiveUserTokenService {
	constructor(
		private readonly activeUserTokenRepository: ActiveUserTokenRepository
	) {}

	async createToken(
		userId: number,
		len: number
	): Promise<ActiveUserTokenDto> {
		const token = crypto.randomBytes(len).toString('hex');

		const createdToken = await this.activeUserTokenRepository.save({
			userId,
			token
		});

		return { ...createdToken };
	}

	async deleteToken(token: string): Promise<void> {
		const affected = await this.activeUserTokenRepository.deleteByToken(
			token
		);

		if (affected === 0) {
			throw new IllegalArgumentError(
				ActiveTokenErrorMessages.INVALID_TOKEN
			);
		}
	}

	async validateAndDeserializeToken(token: string): Promise<number> {
		const activeUserToken =
			await this.activeUserTokenRepository.findByToken(token);

		if (!activeUserToken) {
			throw new IllegalArgumentError(
				ActiveTokenErrorMessages.INVALID_TOKEN
			);
		}

		return activeUserToken.userId;
	}
}
