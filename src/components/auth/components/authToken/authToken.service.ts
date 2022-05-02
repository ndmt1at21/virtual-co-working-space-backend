import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '@src/config';
import util from 'util';
import { RefreshTokenRepository } from '../refreshToken/refreshToken.repository';
import { UnauthorizedError } from '@src/utils/appError';
import { AuthTokenErrorMessages } from './authToken.error';
import { IAuthTokenService } from './@types/IAuthTokenService';
import { IAuthTokenValidate } from './@types/IAuthTokenValidate';
import { CredentialsDto } from '../../@types/dto/Credentials.dto';

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
			expiresIn: config.auth.JWT_ACCESS_TOKEN_EXPIRES_TIME,
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

		return payload.userId;
	};

	const validateAccessToken = async (token: string): Promise<boolean> => {
		let jwtPayload: jwt.JwtPayload;

		try {
			jwtPayload = (await util.promisify(jwt.verify)(
				token,
				config.auth.JWT_SECRET,
				// @ts-ignore
				{ issuer: config.auth.JWT_ISSUER }
			)) as jwt.JwtPayload;
		} catch (err) {
			if (err instanceof jwt.TokenExpiredError) {
				if (err.name === 'TokenExpiredError') {
					throw new UnauthorizedError(
						AuthTokenErrorMessages.ACCESS_TOKEN_EXPIRED
					);
				}
			}

			throw new UnauthorizedError(
				AuthTokenErrorMessages.INVALID_ACCESS_TOKEN
			);
		}

		return true;
	};

	const validateRefreshToken = async (
		refreshToken: string
	): Promise<boolean> => {
		const refreshTokenEntity = await refreshTokenRepository.findByToken(
			refreshToken
		);

		authTokenValidate.checkRefreshTokenExists(refreshTokenEntity);
		authTokenValidate.checkRefreshTokenActive(refreshTokenEntity!);
		authTokenValidate.checkRefreshTokenNotExpired(refreshTokenEntity!);

		return true;
	};

	const validateRefreshTokenCanRenewAccessToken = async (
		refreshToken: string
	): Promise<boolean> => {
		return await validateRefreshToken(refreshToken);
	};

	const renewCredentialByRefreshToken = async (
		refreshToken: string
	): Promise<CredentialsDto> => {
		await validateRefreshTokenCanRenewAccessToken(refreshToken);

		const refreshTokenEntity = await refreshTokenRepository.findByToken(
			refreshToken
		);

		const newAccessToken = await createAccessToken(
			refreshTokenEntity!.userId
		);

		return {
			accessToken: newAccessToken,
			refreshToken: refreshToken
		};
	};

	return {
		createAccessTokenAndRefreshToken,
		createAccessToken,
		createRefreshToken,
		blockRefreshToken,
		deleteRefreshToken,
		validateAccessToken,
		renewCredentialByRefreshToken,
		getUserIdFromAccessToken
	};
};
