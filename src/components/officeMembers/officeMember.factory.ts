import { Socket } from 'socket.io';
import { getCustomRepository } from 'typeorm';
import {
	createOfficeMemberTransformRepository,
	createOfficeMemberTransformService
} from '../officeMemberTransform/officeMemberTransform.factory';
import { OfficeMemberController } from './officeMember.controller';
import { OfficeMemberCreator } from './officeMember.creator';
import { OfficeMemberRepository } from './officeMember.repository';
import { OfficeMemberService } from './officeMember.service';
import { OfficeMemberSocketHandler } from './officeMember.socketHandler';
import { OfficeMemberValidate } from './officeMember.validate';

export function createOfficeMemberController() {
	const service = createOfficeMemberService();
	return OfficeMemberController(service);
}

export function createOfficeMemberSocketHandler(socket: Socket) {
	const officeMemberRepository = createOfficeMemberRepository();
	const officeMemberTransformService = createOfficeMemberTransformService();

	return OfficeMemberSocketHandler(
		socket,
		officeMemberRepository,
		officeMemberTransformService
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
