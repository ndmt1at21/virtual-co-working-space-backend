import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

type GlobalManager = {
	httpServer?: HttpServer;
	socketServer?: SocketServer;
};

const globalManager: GlobalManager = {};

export default globalManager;
