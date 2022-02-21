import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '@src/config';
import util from 'util';
import { RefreshTokenRepository } from '../refreshToken/refreshToken.repository';
import { UnauthorizedError } from '@src/utils/appError';
import { AuthTokenErrorMessages } from './authToken.error';
import { RefreshTokenStatus } from '../refreshToken/@types/RefreshTokenStatus';
import { IAuthTokenService } from './@types/IAuthTokenService';

export const AuthTokenService = (
	refreshTokenRepository: RefreshTokenRepository
): IAuthTokenService => {
	const createAccessTokenAndRefreshToken = async (
		userId: number
	): Promise<[string, string]> => {
		return [createAccessToken(userId), await createRefreshToken(userId)];
	};

	const createAccessToken = (userId: number): string => {
		return jwt.sign({ userId }, config.auth.JWT_SECRET, {
			issuer: config.auth.JWT_ISSUER,
			expiresIn: Date.now() + config.auth.JWT_ACCESS_TOKEN_EXPIRES_TIME,
			algorithm: 'HS256'
		});
	};

	const createRefreshToken = async (userId: number): Promise<string> => {
		const tokenExisted = await refreshTokenRepository.existsTokenWithUserId(
			userId
		);

		if (tokenExisted) {
			throw new UnauthorizedError('Refresh token existed');
		}

		const token = crypto
			.randomBytes(config.auth.REFRESH_TOKEN_LENGTH)
			.toString('hex');

		await refreshTokenRepository.save({
			token,
			userId,
			expiresAt: new Date(
				Date.now() + config.auth.REFRESH_TOKEN_EXPIRES_TIME
			)
		});

		return token;
	};

	const validateAccessToken = async (token: string): Promise<boolean> => {
		try {
			(await util.promisify(jwt.verify)(
				token,
				config.auth.JWT_SECRET
			)) as jwt.JwtPayload;

			return true;
		} catch (err) {
			throw new UnauthorizedError(
				AuthTokenErrorMessages.INVALID_ACCESS_TOKEN
			);
		}
	};

	const validateRefreshToken = async (
		refreshToken: string
	): Promise<boolean> => {
		const refreshTokenEntity = await refreshTokenRepository.findByToken(
			refreshToken
		);

		if (!refreshTokenEntity) {
			throw new UnauthorizedError(
				AuthTokenErrorMessages.INVALID_REFRESH_TOKEN
			);
		}

		if (refreshTokenEntity.status === RefreshTokenStatus.BLOCKED) {
			throw new UnauthorizedError(
				AuthTokenErrorMessages.INVALID_REFRESH_TOKEN
			);
		}

		if (
			refreshTokenEntity.expiresAt.getMilliseconds() <
			new Date().getMilliseconds()
		) {
			throw new UnauthorizedError(
				AuthTokenErrorMessages.INVALID_REFRESH_TOKEN
			);
		}

		return true;
	};

	const getUserIdFromAccessToken = async (token: string): Promise<number> => {
		const payload = (await util.promisify(jwt.verify)(
			token,
			config.auth.JWT_SECRET
		)) as jwt.JwtPayload;

		return +payload.userId;
	};

	return {
		createAccessTokenAndRefreshToken,
		createAccessToken,
		createRefreshToken,
		validateAccessToken,
		validateRefreshToken,
		getUserIdFromAccessToken
	};
};
