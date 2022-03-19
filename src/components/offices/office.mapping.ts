import { OfficeItem } from '@components/officeItems/officeItem.entity';
import { mapOfficeItemToOfficeItemOverviewDto } from '@components/officeItems/officeItem.mapping';
import { OfficeMember } from '@components/officeMembers/officeMember.entity';
import { mapOfficeMemberToOfficeMemberOverviewDto } from '@components/officeMembers/officeMember.mapping';
import { mapUserToUserOverviewDto } from '@components/users/user.mapping';
import { OfficeDetailDto } from './@types/dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './@types/dto/OfficeOverview.dto';
import { Office } from './office.entity';

type OfficeDetailMappingData = {
	office: Office;
	officeMembers: OfficeMember[];
	officeItems: OfficeItem[];
};

export const mapOfficeToOfficeOverviewDto = (
	office: Office
): OfficeOverviewDto => {
	const { id, createdAt, invitationCode, name, createdBy } = office;

	return {
		id,
		name,
		invitationCode,
		createdBy: mapUserToUserOverviewDto(createdBy),
		createdAt
	};
};

export const mapOfficeToOfficeDetailDto = (
	data: OfficeDetailMappingData
): OfficeDetailDto => {
	const { office, officeItems, officeMembers } = data;
	const { id, createdAt, invitationCode, name, createdBy } = office;

	const itemsDto = officeItems.map(item =>
		mapOfficeItemToOfficeItemOverviewDto(item)
	);

	const membersDto = officeMembers.map(member =>
		mapOfficeMemberToOfficeMemberOverviewDto(member)
	);

	return {
		id,
		name,
		invitationCode,
		createdBy: mapUserToUserOverviewDto(createdBy),
		officeItems: itemsDto,
		officeMembers: membersDto,
		createdAt
	};
};