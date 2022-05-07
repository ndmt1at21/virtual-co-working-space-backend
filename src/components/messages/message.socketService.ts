import { Server as SocketServer, Socket } from 'socket.io';
import { OfficeMemberSocketData } from '../officeMembers/@types/socket/OfficeMemberSocketData';
import { IMessageSocketService } from './@types/IMessageSocketService';
import { MessageClientToServerEvent } from './@types/MessageClientToServerEvent';
import { MessageServerToClientEvent } from './@types/MessageServerToClientEvent';
import { MessageSocketServiceParams } from './@types/MessageSocketServiceParams';

export const MessageSocketService = ({
	socketNamespace,
	socket
}: MessageSocketServiceParams): IMessageSocketService => {
	async function onCreateMessage(message: any) {}

	async function onRevokeMessage(message: any) {}

	async function onSelfDeleteMessage(message: any) {}

	async function onReadMessage(message: any) {}

	// async function onJoinToOfficeRoom(data: JoinToOfficeRoomDto) {}

	// async function onMemberMove(transform: UpdateOfficeMemberTransformDto) {
	// 	socket
	// 		.to(`${socket.data.officeMember!.officeId}`)
	// 		.emit('office_member:moved', {
	// 			memberId: socket.user!.id,
	// 			officeId: socket.data.officeMember!.officeId,
	// 			...transform
	// 		});

	// 	await officeMemberTransformService.updateTransformInCacheById(
	// 		socket.data.officeMember!.id,
	// 		transform
	// 	);
	// }

	// async function onMemberDisconnect() {
	// 	const { id, memberId } = socket.data.officeMember!;

	// 	socket
	// 		.to(`${socket.data.officeMember!.officeId}`)
	// 		.emit('office_member:offline', memberId);
	// }

	return {};
};
