import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { IMessageSocketService } from './@types/IMessageSocketService';
import { MessageSocketServiceParams } from './@types/MessageSocketServiceParams';

export const MessageSocketService = ({
	socketNamespace,
	socket,
	messageService,
	logger
}: MessageSocketServiceParams): IMessageSocketService => {
	// TODO: Change officeId to main conversationId of office
	async function onJoinToConversation(conversationId: number) {
		logger.info(
			`User with id ${socket.user?.id} start joining to conversation: ${conversationId}`
		);

		socket.join(`conversation/${conversationId}`);
		socket
			.to(`conversation/${conversationId}`)
			.emit('conversation:joined', {
				userId: socket.user!.id,
				conversationId
			});

		logger.info(
			`User with id ${socket.user?.id} start joining to conversation: ${conversationId}`
		);
	}

	async function onLeaveFromConversation(conversationId: number) {
		logger.info(
			`User with id ${socket.user?.id} start leaving from conversation: ${conversationId}`
		);

		socket.leave(`conversation/${conversationId}`);
		socket.to(`conversation/${conversationId}`).emit('conversation:left', {
			userId: socket.user!.id,
			conversationId
		});

		logger.info(
			`User with id ${socket.user?.id} start leaving from conversation: ${conversationId}`
		);
	}

	async function onCreateMessage(message: CreateMessageDto) {
		logger.info(
			`User with id ${socket.user?.id} sends message to conversation: ${message.conversationId}`
		);

		const createdMessage = await messageService.createMessage({
			...message,
			senderId: socket.user!.id
		});

		socket
			.to(`conversation/${message.conversationId}`)
			.emit('message:sent', createdMessage);

		logger.info(
			`User with id ${socket.user?.id} sent message to conversation: ${message.conversationId}`
		);
	}

	async function onRevokeMessage(messageId: number) {
		const officeId = socket.data.officeMember!.officeId;

		await messageService.revokeMessageByMessageIdAndSenderId(
			messageId,
			socket.user!.id
		);

		socket
			.to(`conversation/${officeId}`)
			.emit('message:revoked', messageId);
	}

	async function onSelfDeleteMessage(messageId: number) {
		const officeId = socket.data.officeMember!.officeId;

		await messageService.deleteMessageSelfSide(messageId, socket.user!.id);

		socket
			.to(`conversation/${officeId}`)
			.emit('message:deleted', messageId);
	}

	async function onMarkAsRead() {}

	return {
		onJoinToConversation,
		onLeaveFromConversation,
		onCreateMessage,
		onRevokeMessage,
		onSelfDeleteMessage,
		onMarkAsRead
	};
};
