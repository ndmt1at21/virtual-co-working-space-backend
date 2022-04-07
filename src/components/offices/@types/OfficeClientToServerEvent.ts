import { OfficeItemClientToServerEvent } from '@src/components/officeItems/@types/OfficeItemClientToServerEvent';
import { OfficeMemberClientToServerEvent } from '@src/components/officeMembers/@types/socket/OfficeMemberClientToServerEvent';

export interface OfficeClientToServerEvent
	extends OfficeMemberClientToServerEvent,
		OfficeItemClientToServerEvent {}
