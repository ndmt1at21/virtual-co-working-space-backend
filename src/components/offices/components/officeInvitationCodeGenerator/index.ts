import config from '@src/config';
import { customAlphabet } from 'nanoid';
import { IOfficeInvitationCodeGenerator } from './@types/IOfficeInvitationCodeGenerator';

const generator: IOfficeInvitationCodeGenerator = {
	generate: () => {
		const nanoid = customAlphabet(
			'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		);

		return nanoid(config.office.OFFICE_INVITE_CODE_LENGTH);
	}
};

export default generator;
