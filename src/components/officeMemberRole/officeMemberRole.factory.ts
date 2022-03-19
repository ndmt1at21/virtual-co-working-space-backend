import { getCustomRepository } from 'typeorm';
import { OfficeMemberRoleRepository } from './officeMemberRole.repository';

export const createOfficeMemberRoleRepository = () => {
	return getCustomRepository(OfficeMemberRoleRepository);
};
