import { MessageServerToClientEvent } from '@src/components/messages/@types/MessageServerToClientEvent';
import { OfficeItemServerToClientEvent } from '@src/components/officeItems/@types/OfficeItemServerToClientEvent';
import { OfficeMemberServerToClientEvent } from '@src/components/officeMembers/@types/socket/OfficeMemberServerToClientEvent';

export interface OfficeServerToClientEvent
	extends OfficeMemberServerToClientEvent,
		OfficeItemServerToClientEvent,
		MessageServerToClientEvent {
	'office:error': (err: any) => void;
}
