import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IConversationService } from '../conversations/@types/IConversationService';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { IMessageService } from './@types/IMessageService';

export class MessageController {
	constructor(
		private readonly messageService: IMessageService,
		private readonly conversationService: IConversationService
	) {}

	createMessage = catchAsyncRequestHandler(async (req, res, next) => {
		const dto = req.body as CreateMessageDto;

		const message = await this.messageService.createMessage({
			...dto,
			senderId: req.user!.id
		});

		res.status(200).json({
			message
		});
	});

	revokeMessage = catchAsyncRequestHandler(async (req, res, next) => {
		const messageId = req.body.messageId;

		await this.messageService.revokeMessageByMessageIdAndSenderId(
			messageId,
			req.user!.id
		);

		res.status(200).json({
			message: 'revoked success'
		});
	});

	deleteSelfSide = catchAsyncRequestHandler(async (req, res, next) => {
		const messageId = req.body.messageId;

		await this.messageService.deleteMessageSelfSide(
			messageId,
			req.user!.id
		);

		res.status(200).json({
			message: 'self side deleted success'
		});
	});

	recentMessages = catchAsyncRequestHandler(async (req, res, next) => {
		const conversationId = req.body.conversationId;

		const messages =
			await this.conversationService.findRecentMessagesByConversationIdAndUserId(
				conversationId,
				req.user!.id,
				{ limit: 100 }
			);

		res.status(200).json({
			messages
		});
	});

	markReadAll = catchAsyncRequestHandler(async (req, res, next) => {
		const conversationId = req.body.conversationId;

		await this.conversationService.markAsReadByConversationIdAndUserId(
			conversationId,
			req.user!.id
		);

		res.status(200).json({
			message: 'read all'
		});
	});
}
