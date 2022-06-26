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
import { getAuth, UserRecord } from 'firebase-admin/auth';
import { UserLoginProvider } from './@types/UserLoginProvider';
import axios from 'axios';

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthController {
	constructor(
		private authMailQueueProducer: IAuthMailQueueProducer,
		private authService: IAuthService,
		private logger: ILogger
	) {}

	localLogin = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(LoginDto, req.body);
		if (errors.length > 0) {
			this.logger.error(`User cannot login: ${errors}`);
			throw new IllegalArgumentError('invalid_login_data', errors);
		}

		const loginDto = req.body as LoginDto;
		const [user, { accessToken, refreshToken }] =
			await this.authService.localLogin(loginDto);

		this.logger.info(`User with id ${user.id} logged in successfully`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: {
				user,
				accessToken,
				refreshToken
			}
		});
	});

	localRegister = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(RegisterDto, req.body);
		if (errors.length > 0) {
			this.logger.error(`User create login: ${errors}`);
			throw new IllegalArgumentError('invalid_register_data', errors);
		}

		const registerDto = req.body as RegisterDto;
		const { user, activeToken } = await this.authService.localRegister(
			registerDto
		);

		this.logger.info(
			`User with email ${user.email} registered successfully has id ${user.id}`
		);

		const clientUrl = appConfig.CLIENT_DOMAIN;
		this.authMailQueueProducer.addRegisterConfirmationJob(
			user,
			activeToken,
			clientUrl
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'user_created_successfully',
			data: {
				user
			}
		});
	});

	googleLogin = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`User starts login with google`);

		passport.authenticate('google', {
			session: false,
			scope: ['email', 'profile']
		})(req, res, next);

		this.logger.info('Success redirect to google login page');
	});

	googleLoginHandler = catchAsyncRequestHandler(async (req, res, next) => {
		try {
			const ticket = await client.verifyIdToken({
				idToken: req.body.token,
				audience: process.env.GOOGLE_CLIENT_ID
			});
			const payload = ticket.getPayload();
			const [user, { accessToken, refreshToken }] =
				await this.authService.externalLogin({
					...payload,
					avatar: payload.picture,
					externalId: payload.sub,
					provider: UserLoginProvider.GOOGLE
				});

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { user, accessToken, refreshToken },
				message: 'user_logged_in_successfully'
			});
		} catch (err) {
			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'this_email_is_login_with_other_provider'
			});
		}
	});

	facebookLoginHandler = catchAsyncRequestHandler(async (req, res, next) => {
		try {
			const { data } = await axios.get(
				`https://graph.facebook.com/v13.0/me?access_token=${req.body.token}&fields=id%2Cname%2Cemail%2Cpicture.type(large)`
			);

			const [user, { accessToken, refreshToken }] =
				await this.authService.externalLogin({
					name: data.name,
					email: data.email,
					avatar: data?.picture?.data.url,
					externalId: data.id,
					provider: UserLoginProvider.FACEBOOK
				});

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { user, accessToken, refreshToken },
				message: 'user_logged_in_successfully'
			});
		} catch (err) {
			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				message: 'this_email_is_login_with_other_provider'
			});
		}
	});

	facebookLogin = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`User starts login with facebook`);

		passport.authenticate('facebook', {
			session: false,
			scope: ['email', 'public_profile']
		})(req, res, next);

		this.logger.info('Success redirect to facebook login page');
	});

	googleLoginCallback = catchAsyncRequestHandler(async (req, res, next) => {
		this.oauth2LoginCallback('google', req, res, next);
	});

	facebookLoginCallback = catchAsyncRequestHandler(async (req, res, next) => {
		this.oauth2LoginCallback('facebook', req, res, next);
	});

	logout = catchAsyncRequestHandler(async (req, res, next) => {
		const refreshToken = req.headers[
			HeaderConstants.REFRESH_TOKEN
		] as string;

		if (!refreshToken) {
			this.logger.error('Cannot logout: missing refresh token');
			throw new IllegalArgumentError(
				AuthErrorMessages.LOGOUT_MISSING_REFRESH_TOKEN
			);
		}

		await this.authService.logout(refreshToken);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'user_logged_out_successfully'
		});
	});

	refreshAccessToken = catchAsyncRequestHandler(async (req, res, next) => {
		const currentRefreshToken = req.headers[
			HeaderConstants.REFRESH_TOKEN
		] as string;

		if (!currentRefreshToken) {
			this.logger.error(
				'Cannot refresh access token: missing refresh token'
			);
			throw new IllegalArgumentError(
				AuthErrorMessages.REFRESH_ACCESS_TOKEN_MISSING_REFRESH_TOKEN
			);
		}

		const { accessToken, refreshToken } =
			await this.authService.refreshAccessToken(currentRefreshToken);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'access_token_renew_successfully',
			data: {
				accessToken,
				refreshToken
			}
		});
	});

	forgotPassword = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(ForgotPasswordDto, req.body);
		if (errors.length > 0) {
			this.logger.error(`Cannot reset password: ${errors}`);
			throw new IllegalArgumentError(
				'Invalid forgot password request',
				errors
			);
		}

		// TODO: not show user not found, just show email was sent
		const forgotPasswordDto = req.body as ForgotPasswordDto;
		const resetToken = await this.authService.forgotPassword(
			forgotPasswordDto
		);

		this.logger.info(
			`Reset password token sent to email ${forgotPasswordDto.email}`
		);

		const clientUrl = appConfig.CLIENT_DOMAIN;
		this.authMailQueueProducer.addResetPasswordMailJob(
			forgotPasswordDto.email,
			resetToken.passwordResetToken,
			clientUrl
		);

		res.status(HttpStatusCode.OK).json({
			message: 'password_reset_token_created_successfully'
		});
	});

	resetPassword = catchAsyncRequestHandler(async (req, res, next) => {
		const resetToken = req.params.token as string;
		if (!resetToken) {
			this.logger.error('Cannot reset password: missing reset token');
			throw new IllegalArgumentError(
				AuthErrorMessages.RESET_PASSWORD_MISSING_RESET_TOKEN
			);
		}

		const errors = await validateRequestBody(
			ResetPasswordContentDto,
			req.body
		);
		if (errors.length > 0) {
			this.logger.error(`Cannot reset password: ${errors}`);
			throw new IllegalArgumentError(
				'Invalid reset password request',
				errors
			);
		}

		const resetPasswordContentDto = req.body as ResetPasswordContentDto;

		await this.authService.resetPassword({
			resetToken,
			...resetPasswordContentDto
		});

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'password_reset_successfully'
		});
	});

	activateNewUser = catchAsyncRequestHandler(async (req, res, next) => {
		const token = req.params.token as string;

		await this.authService.activeNewUser(token);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'user_activated_successfully'
		});
	});

	changePassword = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(ChangePasswordDto, req.body);
		if (errors.length > 0) {
			this.logger.error(`User cannot change password: ${errors}`);
			throw new IllegalArgumentError(
				'Invalid change password data',
				errors
			);
		}

		const changePasswordDto = req.body as ChangePasswordDto;
		await this.authService.changePasswordByUserId(
			req.user!.id,
			changePasswordDto
		);

		this.logger.info(
			`User with id ${req.user!.id} changed password successfully`
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'password_changed_successfully'
		});
	});

	oauth2LoginCallback(
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
					this.logger.error(
						`Authenticating external user with provider ${provider} failed: ${err.message}`
					);
					next(err);
				}

				const profile = user as OAuth2ProfileDto;

				if (!profile) {
					this.logger.error(
						`Invalid external user information. Message ${err.message}`
					);
					throw new UnauthorizedError(
						AuthErrorMessages.UNAUTHORIZED_INCORRECT_EXTERNAL
					);
				}

				this.logger.info(
					`External user with provider ${provider} [email = ${profile.email}] authenticated successfully`
				);

				this.authService
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

						this.logger.info(
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
								code: HttpStatusCode.BAD_REQUEST,
								error: err.message.toLowerCase()
							}
						});

						this.logger.error(
							`User with id ${user.id} logged in (oauth2, provider: ${provider}) failed. Message: ${err.message}`
						);

						res.redirect(redirectUrl);
					});
			}
		)(req, res, next);
	}
}
