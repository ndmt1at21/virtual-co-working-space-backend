import { Socket } from 'socket.io';

declare global {
	namespace Express {
		interface User {
			id: number;
			email: string;
			roles: string[];
			emailVerified: boolean;
		}

		interface Request {
			user?: User;
		}
	}
}

declare module 'socket.io' {
	interface User {
		id: number;
		email: string;
		roles: string[];
	}

	interface OfficeMember {
		id: number;
		officeId: number;
		roles: string[];
	}

	interface Socket {
		user?: User;
	}
}

export {};
