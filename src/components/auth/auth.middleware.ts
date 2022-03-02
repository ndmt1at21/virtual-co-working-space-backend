import { UserRepository } from '@components/users/user.repository';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IAuthTokenService } from '@components/authToken/@types/IAuthTokenService';
import { AuthErrorMessages } from './auth.error';
import { IAuthValidate } from './@types/IAuthValidate';
import { HeaderConstants } from '@src/constant/headerConstants';
import { NextFunction, Request, Response } from 'express';
import { UserRoleType } from '../users/@types/UserRoleType';

export const AuthMiddleware = (
	userRepository: UserRepository,
	authTokenService: IAuthTokenService,
	authValidate: IAuthValidate
) => {
	const deserializeUser = catchAsyncRequestHandler(async (req, res, next) => {
		const accessToken = req.headers[HeaderConstants.ACCESS_TOKEN] as string;
		const refreshToken = req.headers[
			HeaderConstants.REFRESH_TOKEN
		] as string;

		if (!accessToken || !refreshToken) {
			next();
		}

		if (accessToken && refreshToken) {
			// validate access token
			await authTokenService.validateAccessToken(accessToken);

			// decode access token
			const userId = await authTokenService.getUserIdFromAccessToken(
				accessToken
			);

			// validate refresh token
			await authTokenService.validateRefreshToken(userId, refreshToken);

			// validate user
			await authValidate.validateUserCanAccessResourceById(userId);

			// retrieve user
			const user = await userRepository.findById(userId);

			// Assign to req.user
			const { id, email, type } = user!;
			req.user = { id, email, roles: [type] };

			next();
		}
	});

	const protect = catchAsyncRequestHandler(async (req, res, next) => {
		if (req.user) {
			next();
		}

		if (!req.user) {
			next(AuthErrorMessages.UNAUTHORIZED_MISSING_TOKEN);
		}
	});

	const restrictToGuest = catchAsyncRequestHandler(async (req, res, next) => {
		if (req.user) {
			next(AuthErrorMessages.UNAUTHORIZED_ALREADY_LOGGED_IN);
		}

		if (!req.user) {
			next();
		}
	});

	const restrictTo = (roles: UserRoleType[]) => {
		return (req: Request, res: Response, next: NextFunction) => {
			const hasPermission = roles.every(role =>
				req.user?.roles.includes(role)
			);

			if (hasPermission) {
				next();
			}

			if (!hasPermission) {
				next(AuthErrorMessages.UNAUTHORIZED_PERMISSION_DENIED);
			}
		};
	};

	return { deserializeUser, protect, restrictTo, restrictToGuest };
};
