import { Socket } from 'socket.io';

declare global {
	namespace Express {
		interface User {
			id: string;
			email: string;
			roles: string[];
		}

		interface Office {
			id: string;
			createdBy: string;
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
		id: string;
		email: string;
		roles: string[];
	}

	interface OfficeMember {
		id: string;
		officeId: string;
		roles: string[];
	}

	interface Socket {
		user?: User;
	}
}

export {};
