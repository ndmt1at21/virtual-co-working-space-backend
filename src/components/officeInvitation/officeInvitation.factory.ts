import { getCustomRepository } from 'typeorm';
import { OfficeInvitationController } from './officeInvitation.controller';
import { OfficeInvitationRepository } from './officeInvitation.repository';
import { OfficeInvitationService } from './officeInvitation.service';

export function createOfficeInvitationController() {
	const service = createOfficeInvitationService();
	return OfficeInvitationController(service);
}

export function createOfficeInvitationService() {
	const officeInvitationRepository = createOfficeInvitationRepository();
	return OfficeInvitationService(officeInvitationRepository);
}

export function createOfficeInvitationRepository() {
	return getCustomRepository(OfficeInvitationRepository);
}
