import { OfficeItemServerToClientEvent } from '@src/components/officeItems/@types/OfficeItemServerToClientEvent';
import { OfficeMemberServerToClientEvent } from '@src/components/officeMembers/@types/socket/OfficeMemberServerToClientEvent';

export interface OfficeServerToClientEvent
	extends OfficeMemberServerToClientEvent,
		OfficeItemServerToClientEvent {
	'office:error': (err: any) => void;
}
