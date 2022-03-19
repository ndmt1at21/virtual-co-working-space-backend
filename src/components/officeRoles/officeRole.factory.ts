import { getCustomRepository } from 'typeorm';
import { OfficeRoleRepository } from './officeRole.repository';

export function createOfficeRoleRepository() {
	return getCustomRepository(OfficeRoleRepository);
}
