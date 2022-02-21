import { UserRepository } from '@components/users/user.repository';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IAuthTokenService } from '@components/authToken/@types/IAuthTokenService';
import { AuthErrorMessages } from './auth.error';
import { IAuthValidate } from './@types/IAuthValidate';

export const AuthMiddleware = (
	userRepository: UserRepository,
	authTokenService: IAuthTokenService,
	authValidateService: IAuthValidate
) => {
	const deserializeUser = catchAsyncRequestHandler(async (req, res, next) => {
		const accessToken = req.headers['x-access-token'] as string;
		const refreshToken = req.headers['x-refresh-token'] as string;

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
			await authTokenService.validateRefreshToken(refreshToken);

			// validate user
			await authValidateService.validateUserById(userId);

			// retrieve user
			const user = await userRepository.findById(userId);

			// Assign to req.user
			req.user = user;

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

	const restrictTo = (role: string) => {};

	return { deserializeUser, protect, restrictTo, restrictToGuest };
};
