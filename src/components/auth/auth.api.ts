import { Router } from 'express';
import { loadStrategies } from './auth.strategy';
import { createAuthController, createAuthMiddleware } from './auth.factory';

export const AuthRouter = () => {
	const authController = createAuthController();
	const { restrictToGuest, protect } = createAuthMiddleware();

	loadStrategies();

	const router = Router();

	router
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
		.patch('/reset/:token', restrictToGuest, authController.resetPassword)
		.get('/activate/:token', protect, authController.activateNewUser)
		.post('/login', restrictToGuest, authController.localLogin)
		.post('/register', restrictToGuest, authController.localRegister)
		.get('/google', restrictToGuest, authController.googleLogin)
		.post('/google-login', restrictToGuest, authController.googleLoginHandler)
		.post('/facebook-login', restrictToGuest, authController.facebookLoginHandler)
		.get('/facebook', restrictToGuest, authController.facebookLogin)
		.post('/forgot', restrictToGuest, authController.forgotPassword)
		.post(
			'/refreshToken',
			restrictToGuest,
			authController.refreshAccessToken
		);

	router
		.post('/change-password', protect, authController.changePassword)
		.get('/logout', protect, authController.logout);

	return router;
};
