import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { IConversationMemberService } from '../conversationMembers/@types/IConversationMemberService';
import { RecentMessagePageable } from '../messages/@types/RecentMessagePaginate';
import { IConversationService } from './@types/IConversationService';

export const ConversationController = (
	conversationService: IConversationService
	conversationMemberService: IConversationMemberService
) => {
	const getConversationsOfUser = catchAsyncRequestHandler(
		async (req, res, next) => {
			const conversationId = +req.params.id;
			const userId = req.user!.id;

			const conversation =
				await conversationService.findConversationOfUserByConversationIdAndUserId(
					conversationId,
					userId
				);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { ...conversation }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	const getRecentMessagesByConversationIdAndUserId = catchAsyncRequestHandler(
		async (req, res, next) => {
			const conversationId = +req.params.id;
			const userId = req.user!.id;
			const { limit, nextCursor } = req.query as RecentMessagePageable;

			const recentMessages =
				await conversationService.findRecentMessagesByConversationIdAndUserId(
					conversationId,
					userId,
					{ limit, nextCursor }
				);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { ...recentMessages }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	return {
		getRecentMessagesByConversationIdAndUserId,
		getConversationOfUser
	};
};
