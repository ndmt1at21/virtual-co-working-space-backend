import { Server, Socket } from 'socket.io';
import { getCustomRepository } from 'typeorm';
import { getCacheConnection } from '../app/loaders/database/cache';
import { officeMemberSocketLogger } from '../logger';
import { createOfficeMemberRoleRepository } from '../officeMemberRole/officeMemberRole.factory';
import { createOfficeMemberTransformService } from '../officeMemberTransform/officeMemberTransform.factory';
import { createOfficeRoleRepository } from '../officeRoles/officeRole.factory';
import { OfficeMemberController } from './officeMember.controller';
import { OfficeMemberCreator } from './officeMember.creator';
import { OfficeMemberRepository } from './officeMember.repository';
import { OfficeMemberService } from './officeMember.service';
import { OfficeMemberValidate } from './officeMember.validate';
import {
	OfficeMemberSocketCacheService,
	OfficeMemberSocketService
} from './socket';

export function createOfficeMemberController() {
	const service = createOfficeMemberService();
	return new OfficeMemberController(service);
}

export function createOfficeMemberSocketService(io: Server, socket: Socket) {
	const officeMemberRepository = createOfficeMemberRepository();
	const officeMemberTransformService = createOfficeMemberTransformService();
	const officeMemberCacheService = createOfficeMemberCache();

	return OfficeMemberSocketService(
		io,
		socket,
		officeMemberRepository,
		officeMemberTransformService,
		officeMemberCacheService,
		officeMemberSocketLogger
	);
}

export function createOfficeMemberService() {
	const officeMemberRepository = createOfficeMemberRepository();
	const officeRoleRepository = createOfficeRoleRepository();
	const officeMemberRoleRepository = createOfficeMemberRoleRepository();
	const officeMemberCreator = createOfficeMemberCreator();
	const officeMemberValidate = createOfficeMemberValidate();

	return new OfficeMemberService(
		officeMemberRepository,
		officeRoleRepository,
		officeMemberRoleRepository,
		officeMemberCreator,
		officeMemberValidate
	);
}

export function createOfficeMemberCache() {
	const cache = getCacheConnection('officeMember');
	return OfficeMemberSocketCacheService(cache);
}

export function createOfficeMemberValidate() {
	const officeMemberRepository = createOfficeMemberRepository();
	return new OfficeMemberValidate(officeMemberRepository);
}

export function createOfficeMemberCreator() {
	const officeMemberRepository = createOfficeMemberRepository();
	return new OfficeMemberCreator(officeMemberRepository);
}

export function createOfficeMemberRepository() {
	return getCustomRepository(OfficeMemberRepository);
}
