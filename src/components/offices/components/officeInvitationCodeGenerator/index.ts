import { customAlphabet } from 'nanoid';
import { IOfficeInvitationCodeGenerator } from './@types/IOfficeInvitationCodeGenerator';

const generator: IOfficeInvitationCodeGenerator = {
	generate: () => {
		const nanoid = customAlphabet(
			'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		);

		return nanoid(9);
	}
};

export default generator;
