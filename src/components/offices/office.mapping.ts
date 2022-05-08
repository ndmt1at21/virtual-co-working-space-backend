import { OfficeItem } from '@components/officeItems/officeItem.entity';
import { mapOfficeItemToOfficeItemOverviewDto } from '@components/officeItems/officeItem.mapping';
import { OfficeMember } from '@components/officeMembers/officeMember.entity';
import { mapOfficeMemberToOfficeMemberOverviewDto } from '@components/officeMembers/officeMember.mapping';
import { mapUserToUserOverviewDto } from '@components/users/user.mapping';
import { Conversation } from '../conversations/conversation.entity';
import { mapConversationToConversationOverviewDto } from '../conversations/conversation.mapping';
import { OfficeDetailDto } from './@types/dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './@types/dto/OfficeOverview.dto';
import { Office } from './office.entity';

type OfficeDetailMappingData = {
	office: Office;
	officeMembers: OfficeMember[];
	officeItems: OfficeItem[];
	conversations: Conversation[];
};

export const mapOfficeToOfficeOverviewDto = (
	office: Office
): OfficeOverviewDto => {
	const {
		id,
		createdAt,
		invitationCode,
		name,
		avatarUrl,
		createdBy,
		numberOfItems,
		numberOfMembers,
		description
	} = office;

	return {
		id,
		name,
		invitationCode,
		avatarUrl,
		description,
		createdBy: mapUserToUserOverviewDto(createdBy),
		createdAt,
		numberOfItems,
		numberOfMembers
	};
};

export const mapOfficeToOfficeDetailDto = (
	data: OfficeDetailMappingData
): OfficeDetailDto => {
	const { office, officeItems, officeMembers, conversations } = data;
	const {
		id,
		createdAt,
		invitationCode,
		name,
		createdBy,
		avatarUrl,
		description
	} = office;

	const itemsDto = officeItems.map(item =>
		mapOfficeItemToOfficeItemOverviewDto(item)
	);

	const membersDto = officeMembers.map(member =>
		mapOfficeMemberToOfficeMemberOverviewDto(member)
	);

	const conversationsDto = conversations.map(conversation =>
		mapConversationToConversationOverviewDto(conversation)
	);

	return {
		id,
		name,
		invitationCode,
		avatarUrl,
		description,
		createdBy: mapUserToUserOverviewDto(createdBy),
		officeItems: itemsDto,
		officeMembers: membersDto,
		conversations: conversationsDto,
		createdAt
	};
};
