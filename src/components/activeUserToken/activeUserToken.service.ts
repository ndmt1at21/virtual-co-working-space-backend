import crypto from 'crypto';
import config from '@src/config';
import { IllegalArgumentError } from '@src/utils/appError';
import { ActiveTokenErrorMessages } from './activeToken.error';
import { ActiveUserTokenRepository } from './activeUserToken.repository';
import { ActiveUserTokenDto } from './@types/dto/ActiveUserToken.dto';
import { IActiveUserTokenService } from './@types/IActiveUserTokenService';
import { ActiveUserToken } from './activeUserToken.entity';

export const ActiveUserTokenService = (
	activeUserTokenRepository: ActiveUserTokenRepository
): IActiveUserTokenService => {
	const createToken = async (userId: number): Promise<ActiveUserTokenDto> => {
		const token = crypto
			.randomBytes(config.auth.ACTIVE_USER_TOKEN_LENGTH)
			.toString('hex');

		const createdToken = await activeUserTokenRepository
			.createQueryBuilder()
			.insert()
			.into(ActiveUserToken)
			.values({
				userId,
				token
			})
			.execute();

		return { ...createdToken.raw[0] };
	};

	const deleteToken = async (token: string): Promise<number> => {
		return await activeUserTokenRepository.deleteByToken(token);
	};

	const validateToken = async (
		userId: number,
		token: string
	): Promise<boolean> => {
		const activeUserToken =
			await activeUserTokenRepository.findByUserIdAndToken(userId, token);

		if (!activeUserToken) {
			throw new IllegalArgumentError(
				ActiveTokenErrorMessages.INVALID_TOKEN
			);
		}

		return true;
	};

	return {
		createToken,
		validateToken,
		deleteToken
	};
};
