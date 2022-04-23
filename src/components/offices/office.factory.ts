import { getCustomRepository } from 'typeorm';
import { createOfficeItemRepository } from '@components/officeItems/officeItem.factory';
import {
	createOfficeMemberCreator,
	createOfficeMemberRepository
} from '@components/officeMembers/officeMember.factory';
import { OfficeController } from './office.controller';
import { OfficeCreator } from './office.creator';
import { OfficeRepository } from './office.repository';
import { OfficeService } from './office.service';
import { OfficeValidate } from './office.validate';
import { createOfficeRoleRepository } from '@components/officeRoles/officeRole.factory';
import generator from '@src/components/offices/components/officeInvitationCodeGenerator';
import { OfficeSocketHandler } from './office.socketHandler';
import { Server, Socket } from 'socket.io';
import { officeLogger } from '../logger';

export function createOfficeController() {
	return OfficeController(createOfficeService(), officeLogger);
}

export function createOfficeSocketHandler(io: Server, socket: Socket) {
	return OfficeSocketHandler(io, socket);
}

export function createOfficeService() {
	const officeRepository = createOfficeRepository();
	const officeItemRepository = createOfficeItemRepository();
	const officeMemberRepository = createOfficeMemberRepository();
	const officeRoleRepository = createOfficeRoleRepository();
	const officeCreator = createOfficeCreator();
	const officeMemberCreator = createOfficeMemberCreator();
	const officeValidate = createOfficeValidate();
	const generator = createOfficeGenerator();

	return OfficeService(
		officeRepository,
		officeItemRepository,
		officeMemberRepository,
		officeRoleRepository,
		officeCreator,
		officeMemberCreator,
		officeValidate,
		generator
	);
}

export function createOfficeGenerator() {
	return generator;
}

export function createOfficeValidate() {
	const officeRepository = createOfficeRepository();
	return OfficeValidate(officeRepository);
}

export function createOfficeCreator() {
	const officeRepository = createOfficeRepository();
	const officeItemRepository = createOfficeItemRepository();
	const officeMemberRepository = createOfficeMemberRepository();

	return OfficeCreator(
		officeRepository,
		officeMemberRepository,
		officeItemRepository
	);
}

export function createOfficeRepository() {
	return getCustomRepository(OfficeRepository);
}
