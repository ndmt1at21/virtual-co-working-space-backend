import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const officeConfig = {
	OFFICE_INVITE_CODE_LENGTH: +process.env.OFFICE_INVITE_CODE_LENGTH!
};
