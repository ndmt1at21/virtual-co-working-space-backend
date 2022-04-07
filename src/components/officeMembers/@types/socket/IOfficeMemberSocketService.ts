import { UpdateOfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { JoinToOfficeRoomDto } from '@src/components/offices/@types/dto/JoinToOfficeRoom.dto';

export interface IOfficeMemberSocketService {
	onJoinToOfficeRoom(data: JoinToOfficeRoomDto): Promise<void>;

	onMemberMove(transform: UpdateOfficeMemberTransformDto): Promise<void>;

	onMemberDisconnect(): Promise<void>;
}
