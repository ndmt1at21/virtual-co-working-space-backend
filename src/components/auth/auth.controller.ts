import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError, UnauthorizedError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import passport from 'passport';
import { IAuthTokenService } from '@components/authToken/@types/IAuthTokenService';
import { AuthTokenService } from '@components/authToken/authToken.service';
import { IAuthService } from './@types/IAuthService';
import { User } from '../users/user.entity';
import { UserLoginProvider } from '../users/@types/UserLoginProvider';

export const AuthController = (
	authService: IAuthService,
	authTokenService: IAuthTokenService
) => {
	const login = catchAsyncRequestHandler(async (req, res, next) => {
		const { email, password } = req.body;

		if (!email || !password) {
			throw new IllegalArgumentError('Email and password are required.');
		}

		const user = await authService.validateLocalUser({
			email,
			password
		});

		const [accessToken, refreshToken] =
			await authTokenService.createAccessTokenAndRefreshToken(user.id);

		res.status(HttpStatusCode.OK).json({
			accessToken,
			refreshToken
		});
	});

	const googleLogin = catchAsyncRequestHandler(async (req, res, next) => {
		passport.authenticate('google', {
			session: false,
			scope: ['email', 'profile']
		})(req, res, next);
	});

	const facebookLogin = catchAsyncRequestHandler(async (req, res, next) => {
		passport.authenticate('facebook', {
			session: false,
			scope: ['email', 'public_profile']
		})(req, res, next);
	});

	const googleLoginCallback = catchAsyncRequestHandler(
		async (req, res, next) => {
			passport.authenticate('google', { session: false });

			if (!req.user) throw new UnauthorizedError('User not found.');

			// @ts-ignore
			const externalId = req.user.externalId;
			const user = await authService.validateExternalUser(
				externalId,
				UserLoginProvider.GOOGLE
			);

			const [accessToken, refreshToken] =
				await authTokenService.createAccessTokenAndRefreshToken(
					user.id
				);

			res.status(HttpStatusCode.OK).json({
				accessToken,
				refreshToken
			});
		}
	);

	const facebookLoginCallback = catchAsyncRequestHandler(
		async (req, res, next) => {
			passport.authenticate(
				'facebook',
				{ session: false },
				async (err, user, info, status) => {
					if (err) next(err);

					if (!user) throw new UnauthorizedError('User not found.');

					// @ts-ignore
					const [accessToken, refreshToken] =
						await authTokenService.createAccessTokenAndRefreshToken(
							user.id
						);

					res.status(HttpStatusCode.OK).json({
						accessToken,
						refreshToken
					});
				}
			)(req, res, next);
		}
	);

	const register = catchAsyncRequestHandler(async (req, res, next) => {});

	const logout = catchAsyncRequestHandler(async (req, res, next) => {});

	const refreshToken = catchAsyncRequestHandler(async (req, res, next) => {});

	const forgotPassword = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const resetPassword = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	return {
		login,
		googleLogin,
		facebookLogin,
		googleLoginCallback,
		facebookLoginCallback,
		register,
		logout,
		refreshToken,
		forgotPassword,
		resetPassword
	};
};
