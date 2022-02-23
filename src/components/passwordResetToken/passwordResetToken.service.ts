import crypto from 'crypto';
import config from '@src/config';
import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { PasswordResetTokenDto } from './@types/dto/PasswordResetToken.dto';
import { IPasswordResetTokenService } from './@types/IPasswordService';
import { PasswordResetTokenMessages } from './passwordResetToken.error';
import { PasswordResetTokenRepository } from './passwordResetToken.repository';

export const PasswordResetTokenService = (
	passwordResetTokenRepository: PasswordResetTokenRepository
): IPasswordResetTokenService => {
	const findByToken = async (
		token: string
	): Promise<PasswordResetTokenDto> => {
		const resetToken = await passwordResetTokenRepository.findByToken(
			token
		);

		if (!resetToken) {
			throw new NotFoundError(PasswordResetTokenMessages.TOKEN_INVALID);
		}

		return resetToken;
	};

	const createToken = async (
		userId: number
	): Promise<PasswordResetTokenDto> => {
		const tokenPlain = crypto
			.randomBytes(config.auth.RESET_PASSWORD_TOKEN_LENGTH)
			.toString('hex');

		const tokenEncrypt = crypto
			.createHash('sha256')
			.update(tokenPlain)
			.digest('hex');

		const createdToken = await passwordResetTokenRepository.save({
			userId,
			passwordResetToken: tokenEncrypt,
			passwordResetTokenExpired: new Date(
				Date.now() + config.auth.RESET_PASSWORD_TOKEN_EXPIRES_TIME
			)
		});

		return createdToken;
	};

	const validatePasswordResetToken = async (token: string) => {
		const resetToken = await passwordResetTokenRepository.findByToken(
			token
		);

		if (!resetToken) {
			throw new IllegalArgumentError(
				PasswordResetTokenMessages.TOKEN_INVALID
			);
		}

		if (resetToken.passwordResetTokenExpired!.getTime() < Date.now()) {
			throw new IllegalArgumentError(
				PasswordResetTokenMessages.TOKEN_EXPIRED
			);
		}

		return true;
	};

	const deleteByUserId = async (userId: number): Promise<void> => {
		await passwordResetTokenRepository.softDelete(userId);
	};

	return {
		findByToken,
		createToken,
		validatePasswordResetToken,
		deleteByUserId
	};
};
