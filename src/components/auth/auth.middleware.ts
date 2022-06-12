import { NextFunction, Request, Response } from 'express';
import { User } from '@components/users/user.entity';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { AuthErrorMessages } from './auth.error';
import { UserRoleType } from '@components/users/@types/UserRoleType';
import { IAuthMiddleware } from './@types/IAuthMiddleware';
import { IllegalArgumentError, UnauthorizedError } from '@src/utils/appError';
import { UserStatus } from '../users/@types/UserStatus';
import { IAuthValidate } from './@types/IAuthValidate';

export class AuthMiddleware implements IAuthMiddleware {
	constructor(private readonly authValidate: IAuthValidate) {}

	protect = catchAsyncRequestHandler(async (req, res, next) => {
		const accessToken = req.headers.authorization?.split(' ')[1];

		if (!accessToken) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_MISSING_TOKEN
			);
		}

		const { id, type, email, status } = await this.deserializeUser(
			accessToken
		);

		if (status === UserStatus.INACTIVE) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_EMAIL_NOT_VERIFIED
			);
		}

		req.user = {
			id,
			roles: [type],
			email,
			emailVerified: status === UserStatus.ACTIVE
		};

		next();
	});

	restrictToGuest = catchAsyncRequestHandler(async (req, res, next) => {
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
			const user = await this.deserializeUser(accessToken);

			if (user)
				throw new UnauthorizedError(
					AuthErrorMessages.UNAUTHORIZED_ALREADY_LOGGED_IN
				);
		} catch (err) {
			next();
		}
	});

	restrictToEmailVerified = catchAsyncRequestHandler(
		async (req, res, next) => {
			const isEmailVerified = req.user?.emailVerified;

			if (!isEmailVerified)
				throw new IllegalArgumentError(
					AuthErrorMessages.UNAUTHORIZED_EMAIL_NOT_VERIFIED
				);

			next();
		}
	);

	restrictTo = (roles: UserRoleType[]) => {
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

	async deserializeUser(accessToken: string): Promise<User> {
		const user =
			await this.authValidate.validateUserInAccessTokenCanBeAuthenticated(
				accessToken
			);

		return user;
	}
}
