import { Socket } from 'socket.io';
import { UpdateOfficeMemberTransformDto } from '../officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { JoinToOfficeRoomDto } from './@types/dto/JoinToOfficeRoom.dto';
import { IOfficeMemberService } from './@types/IOfficeMemberService';
import { OfficeMemberClientToServerEvent } from './@types/OfficeMemberClientToServerEvent';
import { OfficeMemberOnlineStatus } from './@types/OfficeMemberOnlineStatus';
import { OfficeMemberServerToClientEvent } from './@types/OfficeMemberServerToClientEvent';
import { OfficeMemberSocketData } from './@types/OfficeMemberSocketData';

export const OfficeMemberSocketHandler = (
	socket: Socket<
		OfficeMemberClientToServerEvent,
		OfficeMemberServerToClientEvent,
		any,
		OfficeMemberSocketData
	>,
	officeMemberService: IOfficeMemberService
) => {
	const loadHandlers = async () => {
		socket.on('join', onJoinToOfficeRoom);

		socket.on('move', onMemberMove);

		socket.on('disconnect', onMemberDisconnect);

		async function onJoinToOfficeRoom(data: JoinToOfficeRoomDto) {
			const { officeId, userId } = data;

			try {
				// const officeMember =
				// 	await officeMemberService.findoffic(
				// 		userId,
				// 		officeId
				// 	);
				// await officeMemberService.setOfficeMemberOnlineStatusById(
				// 	officeMember.id,
				// 	OfficeMemberOnlineStatus.ONLINE
				// );
				// socket.data.officeMember = {
				// 	id: officeMember.id,
				// 	memberId: officeMember.member.id,
				// 	officeId: officeMember.officeId
				// };
			} catch (err) {
				socket.disconnect();
				console.log(err);
			}
		}

		async function onMemberMove(transform: UpdateOfficeMemberTransformDto) {
			await officeMemberService.updateOfficeMemberTransformById(
				socket.data.officeMember!.id,
				transform
			);
		}

		async function onMemberDisconnect() {
			const { id } = socket.data.officeMember!;

			await officeMemberService.setOfficeMemberOnlineStatusById(
				id,
				OfficeMemberOnlineStatus.OFFLINE
			);
		}
	};

	return { loadHandlers };
};
