import { Socket } from 'socket.io';
import { UserDetails } from './UserDetails';

declare global {
	namespace Express {
		interface User {
			id: string;
			email: string;
			roles: string[];
		}

		interface Request {
			user?: User;
		}
	}
}

declare module 'socket.io' {
	interface User {
		id: string;
		email: string;
		roles: string[];
	}

	interface Socket {
		user?: UserDetails;
	}
}

export {};
