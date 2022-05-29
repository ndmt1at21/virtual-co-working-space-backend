import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { SocketMiddlewareErrorFunction } from '@src/utils/@types/socketMiddleware';
import { AppError } from '@src/utils/appError';
import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { Socket } from 'socket.io';
import { IConversationService } from '../conversations/@types/IConversationService';
import { ILogger } from '../logger/@types/ILogger';
import { OfficeSocketData } from '../offices/@types/OfficeSocketData';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { DeleteMessageData } from './@types/dto/DeleteMessageData.dto';
import { RevokeMessageData } from './@types/dto/RevokeMessageData.dto';
import { IMessageService } from './@types/IMessageService';
import { MessageClientToServerEvent } from './@types/MessageClientToServerEvent';
import { MessageServerToClientEvent } from './@types/MessageServerToClientEvent';

export type MessageSocket = Socket<
	MessageClientToServerEvent,
	MessageServerToClientEvent,
	any,
	OfficeSocketData
>;

export class MessageSocketController {
	constructor(
		private readonly messageService: IMessageService,
		private readonly conversationService: IConversationService,
		private readonly logger: ILogger
	) {}

	onCreateMessage = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			this.logger.info(
				`User [id = ${socket.user?.id}] create message with data: [${context.body}]`
			);

			const message = context.body as CreateMessageDto;
			const createdMessage = await this.messageService.createMessage({
				...message,
				senderId: socket.user!.id
			});

			this.logger.info(
				`User [id = ${socket.user?.id}] create message [id = ${createdMessage.id}] successfully`
			);

			const memberIds =
				await this.conversationService.findAllMemberIdsByConversationId(
					message.conversationId
				);

			const rooms = memberIds.map(id => `u/${id}`);

			this.logger.info(
				`Start emitting event 'message:sent' to rooms [${rooms}]`
			);

			io.to(rooms).emit('message:sent', {
				...createdMessage,
				tempId: message.tempId
			});

			this.logger.info(`Finish emitting event 'message:sent' to rooms`);
		}
	);

	onRevokeMessage = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			this.logger.info(
				`User [id = ${
					socket.user?.id
				}] revokes message with data [${JSON.stringify(context.body)}]`
			);

			const { conversationId, messageId } =
				context.body as RevokeMessageData;

			await this.messageService.revokeMessageByMessageIdAndSenderId(
				messageId,
				socket.user!.id
			);

			this.logger.info(
				`User [id = ${socket.user?.id}] revoked message [id = ${messageId}]`
			);

			const memberIds =
				await this.conversationService.findAllMemberIdsByConversationId(
					conversationId
				);

			const rooms = memberIds.map(id => `u/${id}`);

			this.logger.info(
				`Start emitting event 'message:revoked' to rooms [${rooms}]`
			);

			io.to(rooms).emit('message:revoked', {
				userId: socket.user!.id,
				messageId: messageId,
				conversationId: conversationId
			});

			this.logger.info(
				`Finish emitting event 'message:revoked' to rooms`
			);
		}
	);

	onSelfDeleteMessage = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			this.logger.info(
				`User [id = ${
					socket.user?.id
				}] deletes message with data [${JSON.stringify(context.body)}]`
			);

			const { conversationId, messageId } =
				context.body as DeleteMessageData;

			await this.messageService.deleteMessageSelfSide(
				messageId,
				socket.user!.id
			);

			this.logger.info(
				`User [id = ${socket.user?.id}] deleted message [id = ${messageId}] in conversation [id = ${conversationId}]`
			);

			this.logger.info(
				`Start to emit 'message:deleted' event to user [id = ${
					socket.user!.id
				}]`
			);

			socket.emit('message:deleted', messageId);

			this.logger.info(
				`Emit 'message:deleted' event to user [id = ${
					socket.user!.id
				}] successfully`
			);
		}
	);

	onMarkAsRead = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			this.logger.info(
				`User [id = ${
					socket.user?.id
				}] marks messages as read with data [${JSON.stringify(
					context.body
				)}]`
			);

			const conversationId = context.params.id;

			const result =
				await this.conversationService.markAsReadByConversationIdAndUserId(
					conversationId,
					socket.user!.id
				);

			this.logger.info(
				`User [id = ${socket.user?.id}] marked messages as read in conversation [id = ${conversationId}]`
			);

			const memberIds =
				await this.conversationService.findAllMemberIdsByConversationId(
					conversationId
				);

			const rooms = memberIds.map(id => `u/${id}`);

			this.logger.info(
				`Start emitting event 'message:read' to rooms [${rooms}]`
			);

			socket.to(rooms).emit('message:read', result);

			this.logger.info(
				`Finished emitting event 'message:read' to rooms successfully`
			);
		}
	);

	handleError: SocketMiddlewareErrorFunction = (
		err,
		io,
		socket,
		context,
		next
	) => {
		if (err instanceof AppError) {
			this.logger.error('AppError: ' + err.message);

			socket.emit('message:error', {
				code: err.statusCode,
				message: err.message,
				errors: err.errors
			});

			return;
		}

		this.logger.error(`${err.message}`);
		this.logger.error(`${err.stack}`);

		socket.emit('message:error', {
			code: HttpStatusCode.INTERNAL_SERVER_ERROR,
			message: 'Something went wrong'
		});
	};
}
