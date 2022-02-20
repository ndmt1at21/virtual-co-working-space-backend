import { Router } from 'express';
import { AuthTokenService } from '../authToken/authToken.service';
import { RefreshTokenRepository } from '../refreshToken/refreshToken.repository';
import { UserRepository } from '../users/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidate } from './auth.validate';
import { loadStrategies } from './auth.strategy';
import { UserService } from '../users/user.service';
import { UserValidate } from '../users/user.validate';
import { UserCreator } from '../users/user.creator';
import { getCustomRepository } from 'typeorm';

export const AuthRouter = () => {
	const userRepository = getCustomRepository(UserRepository);
	const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);

	const userService = UserService(
		userRepository,
		UserValidate(userRepository),
		UserCreator()
	);

	const authTokenService = AuthTokenService(refreshTokenRepository);
	const authValidate = AuthValidate();
	const authService = AuthService(userRepository, authValidate);
	const authController = AuthController(authService, authTokenService);

	loadStrategies(userService);

	const router = Router();

	router
		.post('/login', authController.login)
		.get('/google', authController.googleLogin)
		.get('/facebook', authController.facebookLogin)
		.get('/google/callback', authController.googleLoginCallback)
		.get('/facebook/callback', authController.facebookLoginCallback)
		.post('/register', authController.register)
		.get('/logout', authController.logout)
		.post('/refreshToken', authController.refreshToken)
		.post('/forgot', authController.forgotPassword)
		.patch('/reset/:token', authController.resetPassword);

	return router;
};
