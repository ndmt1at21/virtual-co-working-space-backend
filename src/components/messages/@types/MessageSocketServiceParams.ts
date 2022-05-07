import { OfficeMemberSocketData } from '@src/components/officeMembers/@types/socket/OfficeMemberSocketData';
import { Server, Socket } from 'socket.io';
import { MessageClientToServerEvent } from './MessageClientToServerEvent';
import { MessageServerToClientEvent } from './MessageServerToClientEvent';

export type MessageSocketServiceParams = {
	socketNamespace: Server;
	socket: Socket<
		MessageClientToServerEvent,
		MessageServerToClientEvent,
		any,
		OfficeMemberSocketData
	>;
};
