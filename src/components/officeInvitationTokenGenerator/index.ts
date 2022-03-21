import { IOfficeInvitationTokenGenerator } from './@types/IOfficeInvitationTokenGenerator';
import { v4 } from 'uuid';

export const OfficeInvitationTokenGenerator =
	(): IOfficeInvitationTokenGenerator => {
		const generate = () => {
			return v4();
		};

		return { generate };
	};
