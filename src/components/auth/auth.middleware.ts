import { NextFunction, Request, Response } from 'express';
import { User } from '@components/users/user.entity';
import { UserRepository } from '@components/users/user.repository';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IAuthTokenService } from '@src/components/auth/components/authToken/@types/IAuthTokenService';
import { AuthErrorMessages } from './auth.error';
import { UserRoleType } from '@components/users/@types/UserRoleType';
import { IAuthMiddleware } from './@types/IAuthMiddleware';
import { UnauthorizedError } from '@src/utils/appError';
import { IAuthValidate } from './@types/IAuthValidate';
import { UserStatus } from '../users/@types/UserStatus';

export const AuthMiddleware = (
	userRepository: UserRepository,
	authTokenService: IAuthTokenService,
	authValidate: IAuthValidate
): IAuthMiddleware => {
	const protect = catchAsyncRequestHandler(async (req, res, next) => {
		const accessToken = req.headers.authorization?.split(' ')[1];

		if (!accessToken) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_MISSING_TOKEN
			);
		}

		const { id, type, email, status } = await deserializeUser(accessToken);

		req.user = {
			id,
			roles: [type],
			email,
			emailVerified: status === UserStatus.INACTIVE
		};

		next();
	});

	const restrictToGuest = catchAsyncRequestHandler(async (req, res, next) => {
		const accessToken = req.headers.authorization?.split(' ')[1];

		if (
			!accessToken ||
			accessToken === 'null' ||
			accessToken === 'undefined'
		) {
			next();
			return;
		}

		try {
			const user = await deserializeUser(accessToken);

			if (user)
				throw new UnauthorizedError(
					AuthErrorMessages.UNAUTHORIZED_ALREADY_LOGGED_IN
				);
		} catch (err) {
			next();
		}
	});

	const restrictToEmailVerified = catchAsyncRequestHandler(
		async (req, res, next) => {
			const isEmailVerified = req.user?.emailVerified;

			if (!isEmailVerified)
				throw new UnauthorizedError(
					AuthErrorMessages.UNAUTHORIZED_EMAIL_NOT_VERIFIED
				);
		}
	);

	const restrictTo = (roles: UserRoleType[]) => {
		return (req: Request, res: Response, next: NextFunction) => {
			const hasPermission = roles.every(role =>
				req.user?.roles.includes(role)
			);

			if (hasPermission) {
				next();
			}

			if (!hasPermission) {
				next(
					new UnauthorizedError(
						AuthErrorMessages.UNAUTHORIZED_PERMISSION_DENIED
					)
				);
			}
		};
	};

	async function deserializeUser(accessToken: string): Promise<User> {
		const user =
			await authValidate.validateUserInAccessTokenCanBeAuthenticated(
				accessToken
			);

		return user;
	}

	return { protect, restrictTo, restrictToGuest, restrictToEmailVerified };
};
