import { IOfficeInvitationTokenGenerator } from '@src/components/officeInvitation/components/officeInvitationTokenGenerator/@types/IOfficeInvitationTokenGenerator';
import { OfficeMemberRepository } from '@src/components/officeMembers/officeMember.repository';
import { OfficeRoleRepository } from '@src/components/officeRoles/officeRole.repository';
import { OfficeRepository } from '@src/components/offices/office.repository';
import { OfficeInvitationRepository } from '../officeInvitation.repository';
import { IOfficeInvitationCreator } from './IOfficeInvitationCreator';
import { IOfficeInvitationValidate } from './IOfficeInvitationValidate';

export type OfficeInvitationServiceParams = {
	officeInvitationRepository: OfficeInvitationRepository;
	officeRepository: OfficeRepository;
	officeMemberRepository: OfficeMemberRepository;
	officeRoleRepository: OfficeRoleRepository;
	officeInvitationCreator: IOfficeInvitationCreator;
	officeInvitationValidate: IOfficeInvitationValidate;
	officeInvitationTokenGenerator: IOfficeInvitationTokenGenerator;
};
