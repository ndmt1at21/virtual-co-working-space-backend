import { UserRoleType } from '../users/@types/UserRoleType';
import { IAuthValidate } from '../auth/@types/IAuthValidate';
import { AuthErrorMessages } from '../auth/auth.error';
import { catchAsyncSocketMiddleware } from '@src/utils/catchAsyncSocketMiddleware';
import { UnauthorizedError } from '@src/utils/appError';
import { User } from '../users/user.entity';
import { IAuthSocketMiddleware } from './@types/IAuthSocketMiddleware';
import { ILogger } from '../logger/@types/ILogger';

export class AuthSocketMiddleware implements IAuthSocketMiddleware {
	constructor(
		private readonly authValidate: IAuthValidate,
		private readonly logger: ILogger
	) {}

	protect = catchAsyncSocketMiddleware(async (socket, next) => {
		console.log(socket.handshake);
		const accessToken = socket.handshake.auth.accessToken;
		if (!accessToken) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_MISSING_TOKEN
			);
		}
		const { id, type, email } = await this.deserializeUser(accessToken);
		socket.user = { id, email, roles: [type] };
		next();
	});

	restrictToGuest = catchAsyncSocketMiddleware(async (socket, next) => {
		if (socket.user) {
			throw new Error(AuthErrorMessages.UNAUTHORIZED_ALREADY_LOGGED_IN);
		}

		if (!socket.user) {
			next();
		}
	});

	restrictTo = (roles: UserRoleType[]) => {
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

	async deserializeUser(accessToken: string): Promise<User> {
		const user =
			await this.authValidate.validateUserInAccessTokenCanBeAuthenticated(
				accessToken
			);

		return user;
	}
}
