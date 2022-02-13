import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IAuthService } from './@types/IAuthService';

export const AuthController = (authService: IAuthService) => {
	const login = catchAsyncRequestHandler(async (req, res, next) => {});

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
		register,
		logout,
		refreshToken,
		forgotPassword,
		resetPassword
	};
};
