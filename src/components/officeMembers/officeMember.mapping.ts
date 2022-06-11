import { mapOfficeMemberTransformToTransform3D } from '../officeMemberTransform/officeMemberTransform.mapping';
import { mapOfficeRoleToOfficeRoleDto } from '../officeRoles/officeRole.mapping';
import { mapOfficeToOfficeOverviewDto } from '../offices/office.mapping';
import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { OfficeMemberDetailDto } from './@types/dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './@types/dto/OfficeMemberOverview.dto';
import { OfficeMember } from './officeMember.entity';

export const mapOfficeMemberToOfficeMemberOverviewDto = (
	officeMember: OfficeMember
): OfficeMemberOverviewDto => {
	const { id, member, officeId, transform, onlineStatus, roles } =
		officeMember;

	const memberDto = mapUserToUserOverviewDto(member);
	const transformDto = mapOfficeMemberTransformToTransform3D(transform);
	const rolesDto = roles.map(memberRole =>
		mapOfficeRoleToOfficeRoleDto(memberRole.officeRole)
	);

	return {
		id,
		officeId,
		member: memberDto,
		onlineStatus,
		transform: transformDto,
		roles: rolesDto
	};
};

export const mapOfficeMemberToOfficeMemberDetailDto = (
	officeMember: OfficeMember
): OfficeMemberDetailDto => {
	const { id, member, office, transform, onlineStatus, roles } = officeMember;

	const memberDto = mapUserToUserOverviewDto(member);
	const officeDto = mapOfficeToOfficeOverviewDto(office);
	const transformDto = mapOfficeMemberTransformToTransform3D(transform);
	const rolesName = roles.map(memberRole => memberRole.officeRole.name);

	return {
		id,
		office: officeDto,
		member: memberDto,
		roles: rolesName,
		onlineStatus,
		transform: transformDto
	};
};
