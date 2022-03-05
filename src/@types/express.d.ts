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

export {};
