import { UserRepository } from '@components/users/user.repository';
import { UserRoleType } from '../users/@types/UserRoleType';
import { IAuthValidate } from '../auth/@types/IAuthValidate';
import { AuthErrorMessages } from '../auth/auth.error';
import { IAuthTokenService } from '../authToken/@types/IAuthTokenService';
import { catchAsyncSocketMiddleware } from '@src/utils/catchAsyncSocketMiddleware';
import { UnauthorizedError } from '@src/utils/appError';
import { User } from '../users/user.entity';
import { IAuthSocketMiddleware } from './@types/IAuthSocketMiddleware';

export const AuthSocketMiddleware = (
	userRepository: UserRepository,
	authTokenService: IAuthTokenService,
	authValidate: IAuthValidate
): IAuthSocketMiddleware => {
	const protect = catchAsyncSocketMiddleware(async (socket, next) => {
		const accessToken = socket.handshake.auth.accessToken;

		if (!accessToken) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_MISSING_TOKEN
			);
		}

		const { id, type, email } = await deserializeUser(accessToken);
		socket.user = { id, email, roles: [type] };

		next();
	});

	const restrictToGuest = catchAsyncSocketMiddleware(async (socket, next) => {
		if (socket.user) {
			throw new Error(AuthErrorMessages.UNAUTHORIZED_ALREADY_LOGGED_IN);
		}

		if (!socket.user) {
			next();
		}
	});

	const restrictTo = (roles: UserRoleType[]) => {
		return catchAsyncSocketMiddleware(async (req, next) => {
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

	async function deserializeUser(accessToken: string): Promise<User> {
		await authTokenService.validateAccessToken(accessToken);

		const userId = await authTokenService.getUserIdFromAccessToken(
			accessToken
		);

		await authValidate.validateUserCanAccessResourceById(userId);
		const user = await userRepository.findById(userId);

		if (!user)
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_USER_NOT_FOUND
			);

		return user;
	}

	return { protect, restrictTo, restrictToGuest };
};
