import { socketMiddleware } from '@src/utils/socketMiddleware';
import { Server } from 'socket.io';
import { ConversationSocket } from './@types/socket/ConversationSocket';
import {
	createConversationSocketController,
	createConversationSocketMiddleware,
	createConversationSocketReqValidation
} from './conversation.factory';

export const ConversationSocketHandler = () => {
	const conversationSocketController = createConversationSocketController();
	const conversationSocketMiddleware = createConversationSocketMiddleware();
	const conversationSocketReqValidation =
		createConversationSocketReqValidation();

	const handleError = conversationSocketController.handleError;

	const listen = (io: Server, socket: ConversationSocket) => {
		socket.on('conversation:join', data => {
			const fn = socketMiddleware(
				conversationSocketReqValidation.validateConversationIdParams,
				conversationSocketController.onJoinToConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, { params: { id: data.conversationId } });
		});

		socket.on('conversation:leave', data => {
			const fn = socketMiddleware(
				conversationSocketReqValidation.validateConversationIdParams,
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
				conversationSocketReqValidation.validateConversationIdParams,
				conversationSocketReqValidation.validateUpdateConversationData,
				conversationSocketMiddleware.protect,
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
				conversationSocketReqValidation.validateConversationIdParams,
				conversationSocketReqValidation.validateAddMembersToConversationData,
				conversationSocketMiddleware.protect,
				conversationSocketMiddleware.restrictToOwner,
				conversationSocketController.onAddUsersToConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, {
				params: { id: data.conversationId },
				body: data.userIds
			});
		});

		socket.on('conversation:self_delete', data => {
			const fn = socketMiddleware(
				conversationSocketReqValidation.validateConversationIdParams,
				conversationSocketMiddleware.protect,
				conversationSocketController.onRemoveMemberFromConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, {
				params: { id: data.conversationId },
				body: { userId: socket.user!.id }
			});
		});

		socket.on('conversation:remove_member', data => {
			const fn = socketMiddleware(
				conversationSocketReqValidation.validateConversationIdParams,
				conversationSocketReqValidation.validateRemoveUserFromConversationData,
				conversationSocketMiddleware.protect,
				conversationSocketMiddleware.restrictToOwner,
				conversationSocketController.onRemoveMemberFromConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, {
				params: { id: data.conversationId },
				body: { userId: data.userId }
			});
		});

		socket.on('conversation:delete', data => {
			const fn = socketMiddleware(
				conversationSocketReqValidation.validateConversationIdParams,
				conversationSocketMiddleware.protect,
				conversationSocketMiddleware.restrictToOwner,
				conversationSocketController.onDeleteConversation
			);

			fn.use(handleError);
			fn.execute(io, socket, { params: { id: data.conversationId } });
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
