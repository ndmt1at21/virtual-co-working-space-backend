import { getCustomRepository } from 'typeorm';
import { getQueue } from '../app/loaders/queue/queue';
import { officeInvitationLogger } from '../logger';
import { createMailService } from '../mail/mail.factory';
import { OfficeInvitationTokenGenerator } from './components/officeInvitationTokenGenerator';
import { createOfficeMemberRepository } from '../officeMembers/officeMember.factory';
import { createOfficeRoleRepository } from '../officeRoles/officeRole.factory';
import {
	createOfficeGenerator,
	createOfficeRepository
} from '../offices/office.factory';
import { createUserRepository } from '../users/user.factory';
import { OfficeInvitationMailQueueProducer } from './jobs/mail/mail.producer';
import { OfficeInvitationMailWorker } from './jobs/mail/mail.worker';
import { OfficeInvitationController } from './officeInvitation.controller';
import { OfficeInvitationCreator } from './officeInvitation.creator';
import { OfficeInvitationRepository } from './officeInvitation.repository';
import { OfficeInvitationService } from './officeInvitation.service';
import { OfficeInvitationValidate } from './officeInvitation.validate';

export function createOfficeInvitationController() {
	const service = createOfficeInvitationService();
	const mailProducer = createOfficeInvitationMailProducer();

	return new OfficeInvitationController(service, mailProducer);
}

export function createOfficeInvitationService() {
	const officeInvitationRepository = createOfficeInvitationRepository();
	const officeRepository = createOfficeRepository();
	const officeInvitationValidate = createOfficeInvitationValidate();
	const officeMemberRepository = createOfficeMemberRepository();
	const officeRoleRepository = createOfficeRoleRepository();
	const officeInvitationCreator = createOfficeInvitationCreator();
	const officeInvitationTokenGenerator =
		createOfficeInvitationTokenGenerator();

	return new OfficeInvitationService({
		officeInvitationCreator,
		officeRepository,
		officeInvitationRepository,
		officeInvitationTokenGenerator,
		officeInvitationValidate,
		officeMemberRepository,
		officeRoleRepository
	});
}

export function createOfficeInvitationMailProducer() {
	const queue = getQueue('office_invitation');
	return OfficeInvitationMailQueueProducer(queue);
}

export function createOfficeInvitationMailWorker() {
	const queue = getQueue('office_invitation');
	const mailService = createMailService();

	return OfficeInvitationMailWorker(
		queue,
		mailService,
		officeInvitationLogger
	);
}

export function createOfficeInvitationCreator() {
	const officeInvitationRepository = createOfficeInvitationRepository();
	const officeRepository = createOfficeRepository();

	return new OfficeInvitationCreator(
		officeInvitationRepository,
		officeRepository
	);
}

export function createOfficeInvitationValidate() {
	const officeInvitationRepository = createOfficeInvitationRepository();
	const officeMemberRepository = createOfficeMemberRepository();
	const officeRepository = createOfficeRepository();
	const userRepository = createUserRepository();

	return OfficeInvitationValidate({
		officeInvitationRepository,
		officeRepository,
		officeMemberRepository,
		userRepository
	});
}

export function createOfficeInvitationTokenGenerator() {
	return OfficeInvitationTokenGenerator();
}

export function createOfficeInvitationRepository() {
	return getCustomRepository(OfficeInvitationRepository);
}
