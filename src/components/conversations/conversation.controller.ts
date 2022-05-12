import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { RecentMessagePageable } from '../messages/@types/RecentMessagePaginate';
import { IConversationService } from './@types/IConversationService';

export class ConversationController {
	constructor(private conversationService: IConversationService) {}

	createConversationInOffice = catchAsyncRequestHandler(
		async (req, res, next) => {
			const officeId = req.body.officeId;
			const userId = req.user!.id;

			const conversation =
				await this.conversationService.createConversation({
					creatorId: userId,
					officeId
				});

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { conversation }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	getConversationDetailOfUser = catchAsyncRequestHandler(
		async (req, res, next) => {
			const conversationId = +req.params.id;
			const userId = req.user!.id;

			const conversation =
				await this.conversationService.findConversationDetailByConversationIdAndUserId(
					conversationId,
					userId
				);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { conversation }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	getConversationsOfUserInOffice = catchAsyncRequestHandler(
		async (req, res, next) => {
			const officeId = +req.params.officeId;
			const userId = req.user!.id;

			const conversations =
				await this.conversationService.findConversationsOverviewsOfUserInOffice(
					userId,
					1
				);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { userId, conversations }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	getRecentMessagesByConversationIdAndUserId = catchAsyncRequestHandler(
		async (req, res, next) => {
			const conversationId = +req.params.id;
			const userId = req.user!.id;
			const { limit, nextCursor } = req.query as RecentMessagePageable;

			const recentMessages =
				await this.conversationService.findRecentMessagesByConversationIdAndUserId(
					conversationId,
					userId,
					{ limit, nextCursor }
				);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { messages: recentMessages }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);
}
