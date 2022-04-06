import { UpdateOfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { JoinToOfficeRoomDto } from '@src/components/offices/@types/dto/JoinToOfficeRoom.dto';

export interface OfficeMemberClientToServerEvent {
	'office_member:join': (data: JoinToOfficeRoomDto) => void;

	'office_member:move': (transform: UpdateOfficeMemberTransformDto) => void;
}
