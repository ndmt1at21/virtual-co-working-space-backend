import { Router } from 'express';
import { loadStrategies } from './auth.strategy';
import {
	createAuthController,
	createAuthMiddleware,
	createAuthService
} from './auth.factory';

export const AuthRouter = () => {
	const authService = createAuthService();
	const authMiddleware = createAuthMiddleware();
	const authController = createAuthController();

	loadStrategies(authService);

	const router = Router();

	router
		.use(authMiddleware.restrictToGuest)
		.post('/login', authController.localLogin)
		.post('/register', authController.localRegister)
		.get('/google', authController.googleLogin)
		.get('/facebook', authController.facebookLogin)
		.get('/google/callback', authController.googleLoginCallback)
		.get('/facebook/callback', authController.facebookLoginCallback);

	router
		.use(authMiddleware.protect)
		.get('/logout', authController.logout)
		.post('/refreshToken', authController.refreshToken)
		.post('/forgot', authController.forgotPassword)
		.patch('/reset/:token', authController.resetPassword);

	return router;
};
