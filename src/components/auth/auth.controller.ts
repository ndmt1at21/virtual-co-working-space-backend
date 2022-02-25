import passport from 'passport';
import config from '@src/config';
import queryString from 'query-string';
import events from 'events';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { AuthErrorMessages } from './auth.error';
import { IAuthService } from './@types/IAuthService';
import { ILogger } from '@components/logger/@types/ILogger';
import { IllegalArgumentError, UnauthorizedError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { HeaderConstants } from '@src/constant/headerConstants';
import { OAuth2ProfileDto } from './@types/dto/OAuth2Profile.dto';
import { validateRequestBody } from '@src/utils/requestValidation';
import { LoginDto } from './@types/dto/Login.dto';
import { CreateUserDto } from '../users/@types/dto/CreateUser.dto';
import { ResetPasswordContentDto } from './@types/dto/ResetPasswordContent.dto';
import { ForgotPasswordDto } from './@types/dto/ForgotPassword.dto';
import { RegisterDto } from './@types/dto/Register.dto';

export const AuthController = (authService: IAuthService, logger: ILogger) => {
	const eventEmitter = new events.EventEmitter();

	const localLogin = catchAsyncRequestHandler(async (req, res, next) => {
		const err = await validateRequestBody(LoginDto, req.body);
		if (err) {
			logger.error(`User cannot login: ${err}`);
			throw new IllegalArgumentError(err);
		}

		const loginDto = req.body as LoginDto;
		const [user, { accessToken, refreshToken }] =
			await authService.localLogin(loginDto);

		logger.info(`User with id ${user.id} logged in successfully`);

		res.status(HttpStatusCode.OK).json({
			user,
			accessToken,
			refreshToken
		});
	});

	const localRegister = catchAsyncRequestHandler(async (req, res, next) => {
		const err = await validateRequestBody(RegisterDto, req.body);
		if (err) {
			logger.error(`User create login: ${err}`);
			throw new IllegalArgumentError(err);
		}

		const registerDto = req.body as RegisterDto;
		const user = await authService.localRegister(registerDto);

		logger.info(
			`User with email ${user.email} registered successfully has id ${user.id}`
		);

		eventEmitter.emit('user registered', user);

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

	const logout = catchAsyncRequestHandler(async (req, res, next) => {
		const refreshToken = req.headers[
			HeaderConstants.REFRESH_TOKEN
		] as string;

		if (!refreshToken) {
			logger.error('Cannot logout: missing refresh token');
			throw new IllegalArgumentError(
				AuthErrorMessages.LOGOUT_MISSING_REFRESH_TOKEN
			);
		}

		await authService.logout(refreshToken);

		res.status(HttpStatusCode.OK).json({
			message: 'User logged out successfully'
		});
	});

	const refreshAccessToken = catchAsyncRequestHandler(
		async (req, res, next) => {
			const currentRefreshToken = req.headers[
				HeaderConstants.REFRESH_TOKEN
			] as string;

			if (!currentRefreshToken) {
				logger.error(
					'Cannot refresh access token: missing refresh token'
				);
				throw new IllegalArgumentError(
					AuthErrorMessages.REFRESH_ACCESS_TOKEN_MISSING_REFRESH_TOKEN
				);
			}

			const userId = req.user!.id;
			const { accessToken, refreshToken } =
				await authService.refreshAccessToken(
					userId,
					currentRefreshToken
				);

			res.status(HttpStatusCode.OK).json({
				message: 'Access token renew successfully',
				accessToken,
				refreshToken
			});
		}
	);

	const forgotPassword = catchAsyncRequestHandler(async (req, res, next) => {
		const err = await validateRequestBody(ForgotPasswordDto, req.body);
		if (err) {
			logger.error(`Cannot reset password: ${err}`);
			throw new IllegalArgumentError(err);
		}

		const forgotPasswordDto = req.body as ForgotPasswordDto;
		const resetToken = await authService.forgotPassword(forgotPasswordDto);

		logger.info(
			`Reset password token sent to email ${forgotPasswordDto.email}`
		);

		eventEmitter.emit('forgot password', {
			email: forgotPasswordDto.email,
			resetToken: resetToken.passwordResetToken
		});

		res.status(HttpStatusCode.OK).json({
			message: 'Password reset token created successfully',
			resetToken: resetToken.passwordResetToken
		});
	});

	const resetPassword = catchAsyncRequestHandler(async (req, res, next) => {
		const resetToken = req.params.token as string;
		if (!resetToken) {
			logger.error('Cannot reset password: missing reset token');
			throw new IllegalArgumentError(
				AuthErrorMessages.RESET_PASSWORD_MISSING_RESET_TOKEN
			);
		}

		const err = await validateRequestBody(
			ResetPasswordContentDto,
			req.body
		);
		if (err) {
			logger.error(`Cannot reset password: ${err}`);
			throw new IllegalArgumentError(err);
		}

		const resetPasswordContentDto = req.body as ResetPasswordContentDto;

		await authService.resetPassword({
			resetToken,
			...resetPasswordContentDto
		});

		res.status(HttpStatusCode.OK).json({
			message: 'Password reset successfully'
		});
	});

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

				const profile = user as OAuth2ProfileDto;

				if (!profile) {
					logger.error(
						`Invalid external user information. Message ${err.message}`
					);
					throw new UnauthorizedError(
						AuthErrorMessages.UNAUTHORIZED_INCORRECT_EXTERNAL
					);
				}

				authService
					.oauth2LoginCallback(profile)
					.then(([user, { accessToken, refreshToken }]) => {
						const redirectUrl = queryString.stringifyUrl({
							url: config.auth.BASE_FRONTEND_URL,
							query: {
								access_token: accessToken,
								refresh_token: refreshToken
							}
						});

						logger.info(
							`User with id ${
								user!.id
							} logged in (oauth2, provider: ${provider}) successfully`
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

	return {
		localLogin,
		localRegister,
		googleLogin,
		facebookLogin,
		googleLoginCallback,
		facebookLoginCallback,
		logout,
		refreshAccessToken,
		forgotPassword,
		resetPassword
	};
};
