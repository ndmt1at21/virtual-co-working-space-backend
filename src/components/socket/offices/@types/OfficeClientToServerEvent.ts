import { MessageClientToServerEvent } from '@src/components/messages/@types/MessageClientToServerEvent';
import { OfficeItemClientToServerEvent } from '@src/components/officeItems/@types/OfficeItemClientToServerEvent';
import { OfficeMemberClientToServerEvent } from '@src/components/officeMembers/@types/socket/OfficeMemberClientToServerEvent';
import { EmojiListenerData } from './dto/EmojiData';

export interface OfficeClientToServerEvent
	extends OfficeMemberClientToServerEvent,
		OfficeItemClientToServerEvent,
		MessageClientToServerEvent {
	emoji: (data: EmojiListenerData) => void;
}
