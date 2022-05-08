import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IConversationService } from '../conversations/@types/IConversationService';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { IMessageService } from './@types/IMessageService';

export const MessageController = (
	messageService: IMessageService,
	conversationService: IConversationService
) => {
	const createMessage = catchAsyncRequestHandler(async (req, res, next) => {
		const dto = req.body as CreateMessageDto;

		const message = await messageService.createMessage({
			...dto,
			senderId: req.user!.id
		});

		res.status(200).json({
			message
		});
	});

	const revokeMessage = catchAsyncRequestHandler(async (req, res, next) => {
		const messageId = req.body.messageId;

		await messageService.revokeMessageByMessageIdAndSenderId(
			messageId,
			req.user!.id
		);

		res.status(200).json({
			message: 'revoked success'
		});
	});

	const deleteSelfSide = catchAsyncRequestHandler(async (req, res, next) => {
		const messageId = req.body.messageId;

		await messageService.deleteMessageSelfSide(messageId, req.user!.id);

		res.status(200).json({
			message: 'self side deleted success'
		});
	});

	const recentMessages = catchAsyncRequestHandler(async (req, res, next) => {
		const conversationId = req.body.conversationId;

		const messages =
			await conversationService.findRecentMessagesByConversationIdAndUserId(
				conversationId,
				req.user!.id,
				{ limit: 100 }
			);

		res.status(200).json({
			messages
		});
	});

	const markReadAll = catchAsyncRequestHandler(async (req, res, next) => {
		const conversationId = req.body.conversationId;

		await conversationService.markAsReadByConversationIdAndUserId(
			conversationId,
			req.user!.id
		);

		res.status(200).json({
			message: 'read all'
		});
	});

	return {
		createMessage,
		revokeMessage,
		deleteSelfSide,
		recentMessages,
		markReadAll
	};
};
