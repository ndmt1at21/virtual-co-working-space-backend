import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { RecentMessagePageable } from '../messages/@types/RecentMessagePaginate';
import { IConversationService } from './@types/IConversationService';

export const ConversationController = (
	conversationService: IConversationService
) => {
	const getConversationById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;
			const conversation = await conversationService.findConversationById(
				id
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: {}
			});
		}
	);

	const findRecentMessagesByConversationIdAndUserId =
		catchAsyncRequestHandler(async (req, res, next) => {
			const conversationId = +req.params.id;
			const userId = req.user!.id;
			const { limit, nextCursor } = req.query as RecentMessagePageable;

			const recentMessages =
				await conversationService.findRecentMessagesByConversationIdAndUserId(
					conversationId,
					userId,
					{ limit, nextCursor }
				);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { ...recentMessages }
			});
		});

	return { findRecentMessagesByConversationIdAndUserId };
};
