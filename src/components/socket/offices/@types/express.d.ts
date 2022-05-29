import { Socket } from 'socket.io';

declare global {
	namespace Express {
		interface Office {
			id: number;
			isBlocked?: boolean;
			createdBy: number;
			roles: string[];
		}

		interface Request {
			office?: Office;
		}
	}
}

export {};
