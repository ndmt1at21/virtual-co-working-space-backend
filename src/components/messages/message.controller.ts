import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IMessageService } from './@types/IMessageService';

export const MessageController = (messageService: IMessageService) => {
	const getMessage = catchAsyncRequestHandler(async (req, res, next) => {});

	const getMessages = catchAsyncRequestHandler(async (req, res, next) => {});

	return { getMessage, getMessages };
};
