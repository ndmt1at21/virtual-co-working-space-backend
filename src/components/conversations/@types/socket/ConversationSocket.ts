import { Socket } from 'socket.io';
import { ConversationClientToServerEvent } from './ConversationClientToServerEvent';
import { ConversationServerToClientEvent } from './ConversationServerToClientEvent';
import { ConversationSocketData } from './ConversationSocketData';

export type ConversationSocket = Socket<
	ConversationClientToServerEvent,
	ConversationServerToClientEvent,
	any,
	ConversationSocketData
>;
