import { EntityTypeRepository } from '@src/components/notifications/components/entityType/entityType.repository';
import { OfficeRoleRepository } from '@src/components/officeRoles/officeRole.repository';
import { getCustomRepository } from 'typeorm';

export const initDatabase = async () => {
	try {
		await Promise.all([initOfficeRoles(), initEntityTypes()]);
	} catch (err) {}
};

async function initOfficeRoles() {
	const officeRole = getCustomRepository(OfficeRoleRepository);

	await officeRole.save([
		{ name: 'OWNER' },
		{ name: 'ADMIN' },
		{ name: 'MEMBER' }
	]);
}

async function initEntityTypes() {
	const entityTypeRepository = getCustomRepository(EntityTypeRepository);

	const result = await entityTypeRepository.save([
		{ name: 'office', action: 'create' },
		{ name: 'office', action: 'add_member' },
		{ name: 'message', action: 'create' }
	]);
}
