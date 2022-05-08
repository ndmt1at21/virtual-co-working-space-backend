import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { IMessageSocketService } from './@types/IMessageSocketService';
import { MessageSocketServiceParams } from './@types/MessageSocketServiceParams';

export const MessageSocketService = ({
	socketNamespace,
	socket,
	messageService
}: MessageSocketServiceParams): IMessageSocketService => {
	// TODO: Change officeId to main conversationId of office

	async function onCreateMessage(message: CreateMessageDto) {
		const officeId = socket.data.officeMember!.officeId;

		const createdMessage = await messageService.createMessage({
			...message,
			senderId: socket.user!.id
		});

		socket.to(`messages/${officeId}`).emit('message:sent', createdMessage);
	}

	async function onRevokeMessage(messageId: number) {
		const officeId = socket.data.officeMember!.officeId;

		await messageService.revokeMessageByMessageIdAndSenderId(
			messageId,
			socket.user!.id
		);

		socket.to(`messages/${officeId}`).emit('message:revoked', messageId);
	}

	async function onSelfDeleteMessage(messageId: number) {
		const officeId = socket.data.officeMember!.officeId;

		await messageService.deleteMessageSelfSide(messageId, socket.user!.id);

		socket.to(`messages/${officeId}`).emit('message:deleted', messageId);
	}

	async function onMarkAsRead() {}

	return {
		onCreateMessage,
		onRevokeMessage,
		onSelfDeleteMessage,
		onMarkAsRead
	};
};
