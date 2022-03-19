import { OfficeMemberTransformSocketDto } from './dto/OfficeMemberTransformSocket.dto';

export interface OfficeMemberServerToClientEvent {
	'office_member:error': (err: any) => void;

	'office_member:moved': (transform: OfficeMemberTransformSocketDto) => void;

	'office_member:online': (userId: string) => void;

	'office_member:offline': (userId: string) => void;
}
