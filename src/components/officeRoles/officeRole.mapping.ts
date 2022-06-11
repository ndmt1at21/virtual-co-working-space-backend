import { OfficeRoleDto } from './@types/OfficeRole.dto';
import { OfficeRole } from './officeRole.entity';

export const mapOfficeRoleToOfficeRoleDto = (
	role: OfficeRole
): OfficeRoleDto => {
	return {
		id: role.id,
		name: role.name
	};
};
