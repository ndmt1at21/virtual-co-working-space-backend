import { Router } from 'express';
import { loadStrategies } from './auth.strategy';
import { createAuthController, createAuthMiddleware } from './auth.factory';

export const AuthRouter = () => {
	const authController = createAuthController();
	const { restrictToGuest, protect } = createAuthMiddleware();

	loadStrategies();

	const router = Router();

	router
		.post('/login', restrictToGuest, authController.localLogin)
		.post('/register', restrictToGuest, authController.localRegister)
		.get('/google', restrictToGuest, authController.googleLogin)
		.get('/facebook', restrictToGuest, authController.facebookLogin)
		.get(
			'/google/callback',
			restrictToGuest,
			authController.googleLoginCallback
		)
		.get(
			'/facebook/callback',
			restrictToGuest,
			authController.facebookLoginCallback
		)
		.post('/forgot', restrictToGuest, authController.forgotPassword)
		.patch('/reset/:token', restrictToGuest, authController.resetPassword);

	router
		.post('/refreshToken', protect, authController.refreshAccessToken)
		.get('/logout', protect, authController.logout);

	return router;
};
