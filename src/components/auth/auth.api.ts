import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const router = Router();

const authService = AuthService();
const authController = AuthController(authService);

router
	.post('/login', authController.login)
	.get('/google/callback', authController.googleLoginCallback)
	.get('/facebook/callback', authController.facebookLoginCallback)
	.post('/register', authController.register)
	.get('/logout', authController.logout)
	.post('/refreshToken', authController.refreshToken)
	.post('/forgot', authController.forgotPassword)
	.patch('/reset/:token', authController.resetPassword);

export default router;
