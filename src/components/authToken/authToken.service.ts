import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '@src/config';
import util from 'util';
import { RefreshTokenRepository } from '../refreshToken/refreshToken.repository';
import { UnauthorizedError } from '@src/utils/appError';
import { AuthTokenErrorMessages } from './authToken.error';
import { IAuthTokenService } from './@types/IAuthTokenService';
import { IAuthTokenValidate } from './@types/IAuthTokenValidate';

export const AuthTokenService = (
	refreshTokenRepository: RefreshTokenRepository,
	authTokenValidate: IAuthTokenValidate
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

	const blockRefreshToken = async (refreshToken: string): Promise<void> => {
		await refreshTokenRepository.blockByToken(refreshToken);
	};

	const deleteRefreshToken = async (refreshToken: string): Promise<void> => {
		await refreshTokenRepository.deleteByToken(refreshToken);
	};

	const getUserIdFromAccessToken = async (token: string): Promise<number> => {
		const payload = (await util.promisify(jwt.verify)(
			token,
			config.auth.JWT_SECRET
		)) as jwt.JwtPayload;

		return +payload.userId;
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
		userId: number,
		refreshToken: string
	): Promise<boolean> => {
		const refreshTokenEntity =
			await refreshTokenRepository.findByTokenAndUserId(
				userId,
				refreshToken
			);

		authTokenValidate.checkRefreshTokenExists(refreshTokenEntity);
		authTokenValidate.checkRefreshTokenActive(refreshTokenEntity!);
		authTokenValidate.checkRefreshTokenNotExpired(refreshTokenEntity!);

		return true;
	};

	const validateRefreshTokenCanRenewAccessToken = async (
		userId: number,
		refreshToken: string
	): Promise<boolean> => {
		return await validateRefreshToken(userId, refreshToken);
	};

	return {
		createAccessTokenAndRefreshToken,
		createAccessToken,
		createRefreshToken,
		blockRefreshToken,
		deleteRefreshToken,
		validateAccessToken,
		validateRefreshToken,
		validateRefreshTokenCanRenewAccessToken,
		getUserIdFromAccessToken
	};
};
