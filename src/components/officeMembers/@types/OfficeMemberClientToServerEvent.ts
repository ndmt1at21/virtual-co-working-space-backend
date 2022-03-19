import { UpdateOfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { JoinToOfficeRoomDto } from './dto/JoinToOfficeRoom.dto';

export interface OfficeMemberClientToServerEvent {
	join: (data: JoinToOfficeRoomDto) => void;
	move: (transform: UpdateOfficeMemberTransformDto) => void;
}
