import { OfficeMember } from '@components/officeMembers/officeMember.entity';
import { OfficeMemberTransformSocketDto } from '../dto/OfficeMemberTransformSocket.dto';

export interface OfficeMemberServerToClientEvent {
	'office_member:error': (err: any) => void;

	'office_member:moved': (transform: OfficeMemberTransformSocketDto) => void;

	'office_member:online': (officeMember: OfficeMember) => void;

	'office_member:offline': (userId: number) => void;
}
