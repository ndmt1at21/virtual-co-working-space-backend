import { UserRoleType } from '@src/components/users/@types/UserRoleType';
import { SocketRequestMiddleware } from '@src/utils/catchAsyncSocketMiddleware';

export interface IAuthSocketMiddleware {
	protect: SocketRequestMiddleware;

	restrictToGuest: SocketRequestMiddleware;

	restrictTo(roles: UserRoleType[]): SocketRequestMiddleware;
}
