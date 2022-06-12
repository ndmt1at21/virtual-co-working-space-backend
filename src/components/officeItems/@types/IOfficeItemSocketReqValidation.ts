import { SocketMiddlewareFunction } from '@src/utils/@types/socketMiddleware';

export interface IOfficeItemSocketReqValidation {
	validateOfficeItemIdParams: SocketMiddlewareFunction;

	validateCreateOfficeItemData: SocketMiddlewareFunction;
}
