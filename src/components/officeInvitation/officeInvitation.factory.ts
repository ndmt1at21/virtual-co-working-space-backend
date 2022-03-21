import { getCustomRepository } from 'typeorm';
import { createOfficeMemberRepository } from '../officeMembers/officeMember.factory';
import { OfficeInvitationController } from './officeInvitation.controller';
import { OfficeInvitationRepository } from './officeInvitation.repository';
import { OfficeInvitationService } from './officeInvitation.service';
import { OfficeInvitationValidate } from './officeInvitation.validate';

export function createOfficeInvitationController() {
	const service = createOfficeInvitationService();
	return OfficeInvitationController(service);
}

export function createOfficeInvitationService() {
	const officeInvitationRepository = createOfficeInvitationRepository();
	const officeInvitationValidate = createOfficeInvitationValidate();

	return OfficeInvitationService(
		officeInvitationRepository,
		officeInvitationValidate
	);
}

export function createOfficeInvitationValidate() {
	const officeInvitationRepository = createOfficeInvitationRepository();
	const officeMemberRepository = createOfficeMemberRepository();

	return OfficeInvitationValidate(
		officeInvitationRepository,
		officeMemberRepository
	);
}

export function createOfficeInvitationRepository() {
	return getCustomRepository(OfficeInvitationRepository);
}
