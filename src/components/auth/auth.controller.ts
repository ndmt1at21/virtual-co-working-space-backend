import passport from 'passport';
import config from '@src/config';
import queryString from 'query-string';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { AuthErrorMessages } from './auth.error';
import { IAuthService } from './@types/IAuthService';
import { ILogger } from '@components/logger/@types/ILogger';
import { IllegalArgumentError, UnauthorizedError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IAuthTokenService } from '@components/authToken/@types/IAuthTokenService';
import { IUserService } from '@components/users/@types/IUserService';

export const AuthController = (
	authService: IAuthService,
	authTokenService: IAuthTokenService,
	userService: IUserService,
	logger: ILogger
) => {
	const localLogin = catchAsyncRequestHandler(async (req, res, next) => {
		const { email, password } = req.body;

		if (!email || !password) {
			logger.error('Cannot delete user: missing email or password');
			throw new IllegalArgumentError(
				AuthErrorMessages.LOGIN_MISSING_EMAIL_PASSWORD
			);
		}

		const user = await authService.localLogin({
			email,
			password
		});

		const [accessToken, refreshToken] =
			await authTokenService.createAccessTokenAndRefreshToken(user.id);

		logger.info(`User with id ${user.id} logged in successfully`);

		res.status(HttpStatusCode.OK).json({
			accessToken,
			refreshToken
		});
	});

	const localRegister = catchAsyncRequestHandler(async (req, res, next) => {
		if (!req.body) {
			logger.error(
				'Cannot create user: missing information in request body'
			);
			throw new IllegalArgumentError(
				AuthErrorMessages.REGISTER_MISSING_EMAIL
			);
		}

		const { email, displayName, password, passwordConfirm } = req.body;

		if (!email) {
			logger.error('Cannot create user: missing email');
			throw new IllegalArgumentError(
				AuthErrorMessages.REGISTER_MISSING_EMAIL
			);
		}

		if (!displayName) {
			logger.error('Cannot create user: missing display name');
			throw new IllegalArgumentError(
				AuthErrorMessages.REGISTER_MISSING_DISPLAY_NAME
			);
		}

		if (!password || !passwordConfirm) {
			logger.error(
				'Cannot create user: missing password or password confirmation'
			);
			throw new IllegalArgumentError(
				AuthErrorMessages.REGISTER_MISSING_PASSWORD_OR_CONFIRM_PASSWORD
			);
		}

		const user = await userService.createLocalUser({
			email,
			name: displayName,
			password,
			passwordConfirm
		});

		logger.info(
			`User with email ${email} registered successfully has id ${user.id}`
		);

		res.status(HttpStatusCode.CREATED).json({
			user,
			message: 'User created successfully'
		});
	});

	const googleLogin = catchAsyncRequestHandler(async (req, res, next) => {
		passport.authenticate('google', {
			session: false,
			scope: ['email', 'profile']
		})(req, res, next);

		logger.info('Success redirect to google login page');
	});

	const facebookLogin = catchAsyncRequestHandler(async (req, res, next) => {
		passport.authenticate('facebook', {
			session: false,
			scope: ['email', 'public_profile']
		})(req, res, next);

		logger.info('Success redirect to facebook login page');
	});

	const googleLoginCallback = catchAsyncRequestHandler(
		async (req, res, next) => {
			oauth2LoginCallback('google', req, res, next);
		}
	);

	const facebookLoginCallback = catchAsyncRequestHandler(
		async (req, res, next) => {
			oauth2LoginCallback('facebook', req, res, next);
		}
	);

	function oauth2LoginCallback(
		provider: string,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		passport.authenticate(
			provider,
			{ session: false },
			(err, user, info, status) => {
				if (err) {
					logger.error(
						`Authenticating external user with provider ${provider} failed. Message ${err.message}`
					);
					next(err);
				}

				if (!user || !user.externalId || !user.provider) {
					logger.error(
						`Invalid external user information. Message ${err.message}`
					);
					throw new UnauthorizedError(
						AuthErrorMessages.UNAUTHORIZED_INCORRECT_EXTERNAL
					);
				}

				authTokenService
					.createAccessTokenAndRefreshToken(user.id)
					.then(([accessToken, refreshToken]) => {
						const redirectUrl = queryString.stringifyUrl({
							url: config.auth.BASE_FRONTEND_URL,
							query: {
								access_token: accessToken,
								refresh_token: refreshToken
							}
						});

						logger.info(
							`User with id ${user.id} logged in (oauth2, provider: ${provider}) successfully`
						);

						res.redirect(redirectUrl);
					})
					.catch(err => {
						const redirectUrl = queryString.stringifyUrl({
							url: config.auth.BASE_FRONTEND_URL,
							query: {
								error: err.message.toLowerCase()
							}
						});

						logger.error(
							`User with id ${user.id} logged in (oauth2, provider: ${provider}) failed. Message: ${err.message}`
						);

						res.redirect(redirectUrl);
					});
			}
		)(req, res, next);
	}

	const logout = catchAsyncRequestHandler(async (req, res, next) => {});

	const refreshToken = catchAsyncRequestHandler(async (req, res, next) => {});

	const forgotPassword = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	const resetPassword = catchAsyncRequestHandler(
		async (req, res, next) => {}
	);

	return {
		localLogin,
		localRegister,
		googleLogin,
		facebookLogin,
		googleLoginCallback,
		facebookLoginCallback,
		logout,
		refreshToken,
		forgotPassword,
		resetPassword
	};
};
