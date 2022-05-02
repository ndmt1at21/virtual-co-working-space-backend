import { ConversationRepository } from '@src/components/conversations/conversation.repository';
import { OfficeItemRepository } from '@src/components/officeItems/officeItem.repository';
import { IOfficeMemberCreator } from '@src/components/officeMembers/@types/IOfficeMemberCreator';
import { OfficeMemberRepository } from '@src/components/officeMembers/officeMember.repository';
import { OfficeRoleRepository } from '@src/components/officeRoles/officeRole.repository';
import { IOfficeInvitationCodeGenerator } from '../components/officeInvitationCodeGenerator/@types/IOfficeInvitationCodeGenerator';
import { OfficeRepository } from '../office.repository';
import { IOfficeCreator } from './IOfficeCreator';
import { IOfficeValidate } from './IOfficeValidate';

export type OfficeServiceParams = {
	officeRepository: OfficeRepository;
	officeItemRepository: OfficeItemRepository;
	officeMemberRepository: OfficeMemberRepository;
	officeRoleRepository: OfficeRoleRepository;
	officeCreator: IOfficeCreator;
	officeMemberCreator: IOfficeMemberCreator;
	officeValidate: IOfficeValidate;
	officeInvitationCodeGenerator: IOfficeInvitationCodeGenerator;
	conversationRepository: ConversationRepository;
};
