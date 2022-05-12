import { Server, Socket } from 'socket.io';
import { ILogger } from '../logger/@types/ILogger';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { DeleteMessageData } from './@types/dto/DeleteMessageData.dto';
import { RevokeMessageData } from './@types/dto/RevokeMessageData.dto copy';
import { IMessageService } from './@types/IMessageService';
import { IMessageSocketService } from './@types/IMessageSocketService';

export class MessageSocketService implements IMessageSocketService {
	constructor(
		private readonly socketNamespace: Server,
		private readonly socket: Socket,
		private readonly messageService: IMessageService,
		private readonly logger: ILogger
	) {}

	// TODO: Change officeId to main conversationId of office
	async onJoinToConversation(conversationId: number) {
		this.logger.info(
			`User [id = ${this.socket.user?.id}] start joining to conversation [id = ${conversationId}]`
		);

		this.socket.join(`conversation/${conversationId}`);
		this.socket
			.to(`conversation/${conversationId}`)
			.emit('conversation:joined', {
				userId: this.socket.user!.id,
				conversationId
			});

		this.logger.info(
			`User [id = ${this.socket.user?.id}] start joining to conversation [id = ${conversationId}]`
		);
	}

	async onLeaveFromConversation(conversationId: number) {
		this.logger.info(
			`User with id ${this.socket.user?.id} start leaving from conversation [id = ${conversationId}]`
		);

		this.socket.leave(`conversation/${conversationId}`);
		this.socket
			.to(`conversation/${conversationId}`)
			.emit('conversation:left', {
				userId: this.socket.user!.id,
				conversationId
			});

		this.logger.info(
			`User with id ${this.socket.user?.id} start leaving from conversation [id = ${conversationId}]`
		);
	}

	async onCreateMessage(message: CreateMessageDto) {
		this.logger.info(
			`User [id = ${this.socket.user?.id}] sends message to conversation [id = ${message.conversationId}]`
		);

		const createdMessage = await this.messageService.createMessage({
			...message,
			senderId: this.socket.user!.id
		});

		this.socketNamespace
			.in(`conversation/${message.conversationId}`)
			.emit('message:sent', createdMessage);

		this.logger.info(
			`User [id = ${this.socket.user?.id}] sent message [id = ${createdMessage.id}] to conversation [id = ${message.conversationId}]`
		);
	}

	async onRevokeMessage({ conversationId, messageId }: RevokeMessageData) {
		this.logger.info(
			`User [id = ${this.socket.user?.id}] revokes message [id = ${messageId}] in conversation [id = ${conversationId}]`
		);

		await this.messageService.revokeMessageByMessageIdAndSenderId(
			messageId,
			this.socket.user!.id
		);

		this.socket
			.to(`conversation/${conversationId}`)
			.emit('message:revoked', messageId);

		this.logger.info(
			`User [id = ${this.socket.user?.id}] revoked message [id = ${messageId}] in conversation [id = ${conversationId}]`
		);
	}

	async onSelfDeleteMessage({
		conversationId,
		messageId
	}: DeleteMessageData) {
		this.logger.info(
			`User [id = ${this.socket.user?.id}] deletes message [id = ${messageId}] in conversation [id = ${conversationId}]`
		);

		await this.messageService.deleteMessageSelfSide(
			messageId,
			this.socket.user!.id
		);

		this.socket
			.to(`conversation/${conversationId}`)
			.emit('message:deleted', messageId);

		this.logger.info(
			`User [id = ${this.socket.user?.id}] deleted message [id = ${messageId}] in conversation [id = ${conversationId}]`
		);
	}

	async onMarkAsRead() {}
}
