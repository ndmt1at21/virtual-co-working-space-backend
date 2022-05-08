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
import { HeaderConstants } from '@src/constant/headerConstants';
import { OAuth2ProfileDto } from './@types/dto/OAuth2Profile.dto';
import { validateRequestBody } from '@src/utils/requestValidation';
import { LoginDto } from './@types/dto/Login.dto';
import { ResetPasswordContentDto } from './@types/dto/ResetPasswordContent.dto';
import { ForgotPasswordDto } from './@types/dto/ForgotPassword.dto';
import { RegisterDto } from './@types/dto/Register.dto';
import { IAuthMailQueueProducer } from './@types/IAuthMailQueueProducer';
import { appConfig } from '@src/config/app';
import { ChangePasswordDto } from './@types/dto/ChangePassword.dto';

export const AuthController = (
	authMailQueueProducer: IAuthMailQueueProducer,
	authService: IAuthService,
	logger: ILogger
) => {
	const localLogin = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(LoginDto, req.body);
		if (errors.length > 0) {
			logger.error(`User cannot login: ${errors}`);
			throw new IllegalArgumentError('Invalid login data', errors);
		}

		const loginDto = req.body as LoginDto;
		const [user, { accessToken, refreshToken }] =
			await authService.localLogin(loginDto);

		logger.info(`User with id ${user.id} logged in successfully`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: {
				user,
				accessToken,
				refreshToken
			}
		});
	});

	const localRegister = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(RegisterDto, req.body);
		if (errors.length > 0) {
			logger.error(`User create login: ${errors}`);
			throw new IllegalArgumentError('Invalid register data', errors);
		}

		const registerDto = req.body as RegisterDto;
		const { user, activeToken } = await authService.localRegister(
			registerDto
		);

		logger.info(
			`User with email ${user.email} registered successfully has id ${user.id}`
		);

		const clientUrl = appConfig.CLIENT_DOMAIN;
		authMailQueueProducer.addRegisterConfirmationJob(
			user,
			activeToken,
			clientUrl
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'User created successfully',
			data: {
				user
			}
		});
	});

	const googleLogin = catchAsyncRequestHandler(async (req, res, next) => {
		logger.info(`User with id ${req.user?.id} login with google`);

		passport.authenticate('google', {
			session: false,
			scope: ['email', 'profile']
		})(req, res, next);

		logger.info('Success redirect to google login page');
	});

	const facebookLogin = catchAsyncRequestHandler(async (req, res, next) => {
		logger.info(`User with id ${req.user?.id} login with facebook`);

		passport.authenticate('facebook', {
			session: false,
			scope: ['email', 'public_profile']
		})(req, res, next);

		logger.info('Success redirect to facebook login page');
	});

	const googleLoginCallback = catchAsyncRequestHandler(
		async (req, res, next) => {
			console.log(req);
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
			code: HttpStatusCode.OK,
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

			const { accessToken, refreshToken } =
				await authService.refreshAccessToken(currentRefreshToken);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'Access token renew successfully',
				data: {
					accessToken,
					refreshToken
				}
			});
		}
	);

	const forgotPassword = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(ForgotPasswordDto, req.body);
		if (errors.length > 0) {
			logger.error(`Cannot reset password: ${errors}`);
			throw new IllegalArgumentError(
				'Invalid forgot password request',
				errors
			);
		}

		// TODO: not show user not found, just show email was sent
		const forgotPasswordDto = req.body as ForgotPasswordDto;
		const resetToken = await authService.forgotPassword(forgotPasswordDto);

		logger.info(
			`Reset password token sent to email ${forgotPasswordDto.email}`
		);

		const clientUrl = appConfig.CLIENT_DOMAIN;
		authMailQueueProducer.addResetPasswordMailJob(
			forgotPasswordDto.email,
			resetToken.passwordResetToken,
			clientUrl
		);

		res.status(HttpStatusCode.OK).json({
			message: 'Password reset token created successfully'
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

		const errors = await validateRequestBody(
			ResetPasswordContentDto,
			req.body
		);
		if (errors.length > 0) {
			logger.error(`Cannot reset password: ${errors}`);
			throw new IllegalArgumentError(
				'Invalid reset password request',
				errors
			);
		}

		const resetPasswordContentDto = req.body as ResetPasswordContentDto;

		await authService.resetPassword({
			resetToken,
			...resetPasswordContentDto
		});

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'Password reset successfully'
		});
	});

	const activateNewUser = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = req.user!.id;
		const token = req.params.token as string;

		await authService.activeNewUser(userId, token);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'User activated successfully'
		});
	});

	const changePassword = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(ChangePasswordDto, req.body);
		if (errors.length > 0) {
			logger.error(`User cannot change password: ${errors}`);
			throw new IllegalArgumentError(
				'Invalid change password data',
				errors
			);
		}

		const changePasswordDto = req.body as ChangePasswordDto;
		await authService.changePasswordByUserId(
			req.user!.id,
			changePasswordDto
		);

		logger.info(
			`User with id ${req.user!.id} changed password successfully`
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'Password changed successfully'
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
						`Authenticating external user with provider ${provider} failed: ${err.message}`
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

				logger.info(
					`External user with provider ${provider} [email = ${profile.email}] authenticated successfully`
				);

				authService
					.oauth2LoginCallback(profile)
					.then(([user, { accessToken, refreshToken }]) => {
						const redirectUrl = queryString.stringifyUrl({
							url: config.auth.BASE_FRONTEND_URL,
							query: {
								code: HttpStatusCode.OK,
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
						console.log(config.auth.BASE_FRONTEND_URL);

						const redirectUrl = queryString.stringifyUrl({
							url: config.auth.BASE_FRONTEND_URL,
							query: {
								code: HttpStatusCode.BAD_REQUEST,
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
		resetPassword,
		activateNewUser,
		changePassword
	};
};
