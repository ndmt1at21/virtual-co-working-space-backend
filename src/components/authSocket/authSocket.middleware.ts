import { UserRepository } from '@components/users/user.repository';
import { UserRoleType } from '../users/@types/UserRoleType';
import { IAuthValidate } from '../auth/@types/IAuthValidate';
import { AuthErrorMessages } from '../auth/auth.error';
import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { IAuthTokenService } from '../authToken/@types/IAuthTokenService';

export const AuthSocketMiddleware = (
	userRepository: UserRepository,
	authTokenService: IAuthTokenService,
	authValidate: IAuthValidate
) => {
	const deserializeUser = catchAsyncSocketHandler(async (socket, next) => {
		const accessToken = socket.handshake.auth.accessToken;

		if (!accessToken) {
			return next();
		}

		await authTokenService.validateAccessToken(accessToken);

		const userId = await authTokenService.getUserIdFromAccessToken(
			accessToken
		);

		// await authTokenService.validateRefreshToken(userId, refreshToken);
		await authValidate.validateUserCanAccessResourceById(userId);

		const user = await userRepository.findById(userId);

		const { id, email, type } = user!;
		socket.user = { id, email, roles: [type] };

		next();
	});

	const protect = catchAsyncSocketHandler(async (socket, next) => {
		if (socket.user) {
			next();
		}

		if (!socket.user) {
			next(new Error(AuthErrorMessages.UNAUTHORIZED_MISSING_TOKEN));
		}
	});

	const restrictToGuest = catchAsyncSocketHandler(async (socket, next) => {
		if (socket.user) {
			throw new Error(AuthErrorMessages.UNAUTHORIZED_ALREADY_LOGGED_IN);
		}

		if (!socket.user) {
			next();
		}
	});

	const restrictTo = (roles: UserRoleType[]) => {
		return catchAsyncSocketHandler(async (req, next) => {
			const hasPermission = roles.every(role =>
				req.user?.roles.includes(role)
			);

			if (hasPermission) {
				next();
			}

			if (!hasPermission) {
				throw new Error(
					AuthErrorMessages.UNAUTHORIZED_PERMISSION_DENIED
				);
			}
		});
	};

	return { deserializeUser, protect, restrictTo, restrictToGuest };
};
