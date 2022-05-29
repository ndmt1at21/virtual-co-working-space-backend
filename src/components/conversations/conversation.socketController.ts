import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { SocketMiddlewareErrorFunction } from '@src/utils/@types/socketMiddleware';
import { AppError } from '@src/utils/appError';
import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { Server, Socket } from 'socket.io';
import { ILogger } from '../logger/@types/ILogger';
import { OfficeMemberSocketData } from '../officeMembers/@types/socket/OfficeMemberSocketData';
import { AddUsersToConversationDto } from './@types/dto/AddUsersToConversation.dto';
import { CreateConversationDto } from './@types/dto/CreateConversation.dto';
import { JoinOrLeaveConversationDto } from './@types/dto/JoinOrLeaveConversation.dto';
import { UpdateConversationDto } from './@types/dto/UpdateConversation.dto';
import { IConversationService } from './@types/IConversationService';
import { ConversationClientToServerEvent } from './@types/socket/ConversationClientToServerEvent';
import { ConversationServerToClientEvent } from './@types/socket/ConversationServerToClientEvent';

export type ConversationSocket = Socket<
	ConversationClientToServerEvent,
	ConversationServerToClientEvent,
	any,
	OfficeMemberSocketData
>;

export class ConversationSocketController {
	constructor(
		private readonly conversationService: IConversationService,
		private readonly logger: ILogger
	) {}

	onJoinToConversation = catchAsyncSocketHandler(
		async (io: Server, socket: ConversationSocket, context: any, next) => {
			this.logger.info(
				`User ${socket.user!.id} is joining to conversation ${
					context.params.id
				}`
			);

			const conversationId = +context.params.id;

			socket.join(`conversation/${conversationId}`);

			this.logger.info(
				`User ${
					socket.user!.id
				} joined to conversation ${conversationId}`
			);

			this.logger.info(
				`Start emitting event 'conversation:joined' to room conversation/${conversationId}`
			);

			socket
				.to(`conversation/${conversationId}`)
				.emit('conversation:joined', {
					userId: socket.user!.id,
					conversationId
				});

			this.logger.info(
				`End emitting event 'conversation:joined' to rooms`
			);
		}
	);

	onLeaveFromConversation = catchAsyncSocketHandler(
		async (io: Server, socket: ConversationSocket, context: any, next) => {
			this.logger.info(
				`User ${socket.user!.id} is leaving from conversation ${
					context.params.id
				}`
			);

			const conversationId = +context.params.id;

			socket.leave(`conversation/${conversationId}`);

			this.logger.info(
				`User ${
					socket.user!.id
				} left from conversation ${conversationId}`
			);

			this.logger.info(
				`Start emitting event 'conversation:left' to room 'conversation/${conversationId}'`
			);

			socket
				.to(`conversation/${conversationId}`)
				.emit('conversation:left', {
					userId: socket.user!.id,
					conversationId
				});

			this.logger.info(`End emitting event 'conversation:left' to rooms`);
		}
	);

	onCreateConversation = catchAsyncSocketHandler(
		async (io: Server, socket: ConversationSocket, context: any, next) => {
			this.logger.info(
				`User ${
					socket.user!.id
				} is creating conversation with data: ${JSON.stringify(
					context.body
				)}`
			);

			const createConversationDto = context.body as CreateConversationDto;

			const createdConversation =
				await this.conversationService.createConversation(
					createConversationDto
				);

			this.logger.info(
				`User ${socket.user!.id} created conversation [id = ${
					createdConversation.conversation.id
				}] successfully`
			);

			const rooms = createdConversation.conversation.members.map(
				member => `u/${member.userId}`
			);

			this.logger.info(
				`Start emitting event 'conversation:created' to rooms: ${rooms}`
			);

			socket.to(rooms).emit('conversation:created', {
				conversation: createdConversation
			});

			this.logger.info(
				`End emitting event 'conversation:created' to rooms`
			);
		}
	);

	onUpdateConversation = catchAsyncSocketHandler(
		async (io: Server, socket: ConversationSocket, context: any, next) => {
			this.logger.info(
				`User ${socket.user!.id} is updating conversation ${
					context.params.id
				} with data: ${JSON.stringify(context.body)}`
			);

			const conversationId = context.params.id;
			const updateConversationDto = context.body as UpdateConversationDto;

			const updatedConversation =
				await this.conversationService.updateConversationById(
					conversationId,
					updateConversationDto
				);

			this.logger.info(
				`User ${socket.user!.id} updated conversation [id = ${
					updatedConversation.id
				}] successfully`
			);

			const memberIds =
				await this.conversationService.findAllMemberIdsByConversationId(
					conversationId
				);

			const rooms = memberIds.map(id => `u/${id}`);

			this.logger.info(
				`Start emitting event 'conversation:updated' to rooms: ${rooms}`
			);

			socket.to(rooms).emit('conversation:updated', {
				conversation: updatedConversation
			});

			this.logger.info(
				`End emitting event 'conversation:updated' to rooms`
			);
		}
	);

	onAddUsersToConversation = catchAsyncSocketHandler(
		async (io: Server, socket: ConversationSocket, context: any, next) => {
			this.logger.info(
				`User ${socket.user!.id} is adding users to conversation ${
					context.params.id
				} with data: ${JSON.stringify(context.body)}`
			);

			const conversationId = context.params.id;
			const { userIds } = context.body as AddUsersToConversationDto;

			const joinedConversationMembers =
				await this.conversationService.findAllMemberIdsByConversationId(
					conversationId
				);

			const newConversationMembers =
				await this.conversationService.addMembersToConversation(
					conversationId,
					userIds
				);

			this.logger.info(
				`User ${
					socket.user!.id
				} added users to conversation ${conversationId} successfully`
			);

			// conversation detail for emitting to new members
			const conversation =
				await this.conversationService.findConversationDetailByConversationIdAndUserId(
					conversationId,
					socket.user!.id
				);

			// prepare rooms
			const newMemberRooms = newConversationMembers.map(
				cm => `u/${cm.userId || cm.user?.id}`
			);

			const existsMemberRooms = joinedConversationMembers.map(
				memberId => `u/${memberId}`
			);

			// emit
			this.logger.info(
				`Start emitting event 'conversation:members_added' to rooms: ${newMemberRooms} and ${existsMemberRooms}`
			);

			socket.to(newMemberRooms).emit('conversation:members_added', {
				conversation
			});

			socket.to(existsMemberRooms).emit('conversation:members_added', {
				newMembers: newConversationMembers
			});

			this.logger.info(
				`End emitting event 'conversation:members_added' to rooms`
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
			this.logger.info(err.message);

			socket.emit('conversation:error', {
				code: err.statusCode,
				message: err.message,
				errors: err.errors
			});

			return;
		}

		this.logger.error(`${err.message}`);
		this.logger.error(`${err.stack}`);

		socket.emit('conversation:error', {
			code: HttpStatusCode.INTERNAL_SERVER_ERROR,
			message: 'Something went wrong'
		});
	};
}