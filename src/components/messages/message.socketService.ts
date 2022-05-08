import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { DeleteMessageData } from './@types/dto/DeleteMessageData.dto';
import { RevokeMessageData } from './@types/dto/RevokeMessageData.dto copy';
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
			`User [id = ${socket.user?.id}] start joining to conversation [id = ${conversationId}]`
		);

		socket.join(`conversation/${conversationId}`);
		socket
			.to(`conversation/${conversationId}`)
			.emit('conversation:joined', {
				userId: socket.user!.id,
				conversationId
			});

		logger.info(
			`User [id = ${socket.user?.id}] start joining to conversation [id = ${conversationId}]`
		);
	}

	async function onLeaveFromConversation(conversationId: number) {
		logger.info(
			`User with id ${socket.user?.id} start leaving from conversation [id = ${conversationId}]`
		);

		socket.leave(`conversation/${conversationId}`);
		socket.to(`conversation/${conversationId}`).emit('conversation:left', {
			userId: socket.user!.id,
			conversationId
		});

		logger.info(
			`User with id ${socket.user?.id} start leaving from conversation [id = ${conversationId}]`
		);
	}

	async function onCreateMessage(message: CreateMessageDto) {
		logger.info(
			`User [id = ${socket.user?.id}] sends message to conversation [id = ${message.conversationId}]`
		);

		const createdMessage = await messageService.createMessage({
			...message,
			senderId: socket.user!.id
		});

		socket
			.in(`conversation/${message.conversationId}`)
			.emit('message:sent', createdMessage);

		logger.info(
			`User [id = ${socket.user?.id}] sent message [id = ${createdMessage.id}] to conversation [id = ${message.conversationId}]`
		);
	}

	async function onRevokeMessage({
		conversationId,
		messageId
	}: RevokeMessageData) {
		logger.info(
			`User [id = ${socket.user?.id}] revokes message [id = ${messageId}] in conversation [id = ${conversationId}]`
		);

		await messageService.revokeMessageByMessageIdAndSenderId(
			messageId,
			socket.user!.id
		);

		socket
			.to(`conversation/${conversationId}`)
			.emit('message:revoked', messageId);

		logger.info(
			`User [id = ${socket.user?.id}] revoked message [id = ${messageId}] in conversation [id = ${conversationId}]`
		);
	}

	async function onSelfDeleteMessage({
		conversationId,
		messageId
	}: DeleteMessageData) {
		logger.info(
			`User [id = ${socket.user?.id}] deletes message [id = ${messageId}] in conversation [id = ${conversationId}]`
		);

		await messageService.deleteMessageSelfSide(messageId, socket.user!.id);

		socket
			.to(`conversation/${conversationId}`)
			.emit('message:deleted', messageId);

		logger.info(
			`User [id = ${socket.user?.id}] deleted message [id = ${messageId}] in conversation [id = ${conversationId}]`
		);
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
