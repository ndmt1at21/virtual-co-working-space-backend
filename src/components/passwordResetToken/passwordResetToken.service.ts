import crypto from 'crypto';
import config from '@src/config';
import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { PasswordResetTokenDto } from './@types/dto/PasswordResetToken.dto';
import { IPasswordResetTokenService } from './@types/IPasswordService';
import { PasswordResetTokenMessages } from './passwordResetToken.error';
import { PasswordResetTokenRepository } from './passwordResetToken.repository';
import { IPasswordResetTokenCreator } from './@types/IPasswordResetTokenCreator';

export const PasswordResetTokenService = (
	passwordResetTokenRepository: PasswordResetTokenRepository,
	passwordResetTokenCreator: IPasswordResetTokenCreator
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

		return passwordResetTokenCreator.mapPasswordResetTokenToPasswordResetTokenDto(
			resetToken
		);
	};

	const createToken = async (
		userId: string
	): Promise<PasswordResetTokenDto> => {
		const tokenPlain = crypto
			.randomBytes(config.auth.RESET_PASSWORD_TOKEN_LENGTH)
			.toString('hex');

		const tokenEncrypt = encryptToken(tokenPlain);

		const createdToken = await passwordResetTokenRepository.save({
			userId,
			passwordResetToken: tokenPlain,
			passwordResetTokenExpired: new Date(
				Date.now() + config.auth.RESET_PASSWORD_TOKEN_EXPIRES_TIME
			)
		});

		return passwordResetTokenCreator.mapPasswordResetTokenToPasswordResetTokenDto(
			{ ...createdToken, passwordResetToken: tokenEncrypt }
		);
	};

	const validateToken = async (token: string) => {
		const tokenEncrypt = encryptToken(token);

		const resetToken = await passwordResetTokenRepository.findByToken(
			tokenEncrypt
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

	const deleteByUserId = async (userId: string): Promise<void> => {
		await passwordResetTokenRepository.softDelete(userId);
	};

	function encryptToken(token: string): string {
		return crypto.createHash('sha256').update(token).digest('hex');
	}

	return {
		findByToken,
		createToken,
		validateToken,
		deleteByUserId
	};
};
