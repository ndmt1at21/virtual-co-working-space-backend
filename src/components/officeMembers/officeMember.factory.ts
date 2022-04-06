import { Server, Socket } from 'socket.io';
import { getCustomRepository } from 'typeorm';
import { getCacheConnection } from '../app/loaders/database/cache';
import {
	createOfficeMemberTransformRepository,
	createOfficeMemberTransformService
} from '../officeMemberTransform/officeMemberTransform.factory';
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
	return OfficeMemberController(service);
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
		officeMemberCacheService
	);
}

export function createOfficeMemberService() {
	const officeMemberRepository = createOfficeMemberRepository();
	const officeMemberTransformRepository =
		createOfficeMemberTransformRepository();
	const officeMemberCreator = createOfficeMemberCreator();
	const officeMemberValidate = createOfficeMemberValidate();

	return OfficeMemberService(
		officeMemberRepository,
		officeMemberTransformRepository,
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
	return OfficeMemberValidate(officeMemberRepository);
}

export function createOfficeMemberCreator() {
	const officeMemberRepository = createOfficeMemberRepository();
	return OfficeMemberCreator(officeMemberRepository);
}

export function createOfficeMemberRepository() {
	return getCustomRepository(OfficeMemberRepository);
}
