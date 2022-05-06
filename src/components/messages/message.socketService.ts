// import { Server as SocketServer, Socket } from 'socket.io';
// import { MessageClientToServerEvent } from './@types/MessageClientToServerEvent';
// import { MessageServerToClientEvent } from './@types/MessageServerToClientEvent';

// export const MessageSocketService = (
// 	socketNamespace: SocketServer,
// 	socket: Socket<
// 		MessageClientToServerEvent,
// 		MessageServerToClientEvent,
// 		any,
// 		OfficeMemberSocketData
// 	>
// ) => {
// 	async function onJoinToOfficeRoom(data: JoinToOfficeRoomDto) {}

// 	async function onMemberMove(transform: UpdateOfficeMemberTransformDto) {
// 		socket
// 			.to(`${socket.data.officeMember!.officeId}`)
// 			.emit('office_member:moved', {
// 				memberId: socket.user!.id,
// 				officeId: socket.data.officeMember!.officeId,
// 				...transform
// 			});

// 		await officeMemberTransformService.updateTransformInCacheById(
// 			socket.data.officeMember!.id,
// 			transform
// 		);
// 	}

// 	async function onMemberDisconnect() {
// 		const { id, memberId } = socket.data.officeMember!;

// 		socket
// 			.to(`${socket.data.officeMember!.officeId}`)
// 			.emit('office_member:offline', memberId);
// 	}

// 	return {};
// };
