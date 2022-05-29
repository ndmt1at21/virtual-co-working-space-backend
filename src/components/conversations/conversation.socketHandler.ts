import { socketMiddleware } from '@src/utils/socketMiddleware';
import { Server, Socket } from 'socket.io';
import { OfficeMemberSocketData } from '../officeMembers/@types/socket/OfficeMemberSocketData';
import { ConversationClientToServerEvent } from './@types/socket/ConversationClientToServerEvent';
import { ConversationServerToClientEvent } from './@types/socket/ConversationServerToClientEvent';
import {
	createConversationSocketController,
	createConversationSocketReqValidation
} from './conversation.factory';

export const ConversationSocketHandler = () => {
	const conversationSocketController = createConversationSocketController();
	const conversationSocketReqValidation =
		createConversationSocketReqValidation();

	const handleError = conversationSocketController.handleError;

	const listen = (
		io: Server,
		socket: Socket<
			ConversationClientToServerEvent,
			ConversationServerToClientEvent,
			any,
			OfficeMemberSocketData
		>
	) => {
		socket.on('conversation:join', data => {
			const fn = socketMiddleware(
				conversationSocketController.onJoinToConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, { params: { id: data.conversationId } });
		});

		socket.on('conversation:leave', data => {
			const fn = socketMiddleware(
				conversationSocketController.onLeaveFromConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, { params: { id: data.conversationId } });
		});

		socket.on('conversation:create', data => {
			const fn = socketMiddleware(
				conversationSocketReqValidation.validateCreateConversationData,
				conversationSocketController.onCreateConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, { body: data });
		});

		socket.on('conversation:update', data => {
			const { conversationId, ...body } = data;
			const fn = socketMiddleware(
				conversationSocketReqValidation.validateUpdateConversationData,
				conversationSocketController.onUpdateConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, {
				params: { id: conversationId },
				body
			});
		});

		socket.on('conversation:add_members', data => {
			const fn = socketMiddleware(
				conversationSocketReqValidation.validateAddMembersToConversationData,
				conversationSocketController.onAddUsersToConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, {
				params: { id: data.conversationId },
				body: data.userIds
			});
		});

		socket.on('disconnect', () => {
			// where is conversation id?
			// const fn = socketMiddleware(
			// 	conversationSocketController.onLeaveFromConversation
			// );
			// fn.use(handleError);
			// fn.execute(io, socket, null);
		});
	};

	return { listen };
};
