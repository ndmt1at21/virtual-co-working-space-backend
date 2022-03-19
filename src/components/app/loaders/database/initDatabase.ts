import { OfficeRoleRepository } from '@src/components/officeRoles/officeRole.repository';
import { getCustomRepository } from 'typeorm';

export const initDatabase = async () => {
	try {
		const officeRole = getCustomRepository(OfficeRoleRepository);

		await officeRole.save([
			{ name: 'OWNER' },
			{ name: 'ADMIN' },
			{ name: 'MEMBER' }
		]);
	} catch (err) {}
};
