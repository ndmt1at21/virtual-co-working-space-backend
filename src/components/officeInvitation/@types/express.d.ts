declare global {
	interface OfficeInvitation {
		id: number;
		inviterId: number;
		invitedEmail?: string;
		type: string;
	}

	namespace Express {
		interface Request {
			officeInvitation?: number;
		}
	}
}

export {};
