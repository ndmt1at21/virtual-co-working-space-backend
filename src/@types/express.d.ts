import { Socket } from 'socket.io';

declare global {
	namespace Express {
		interface User {
			id: number;
			email: string;
			roles: string[];
		}

		interface Office {
			id: number;
			createdBy: number;
			role: string[];
		}

		interface Request {
			user?: User;
			office?: Office;
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
