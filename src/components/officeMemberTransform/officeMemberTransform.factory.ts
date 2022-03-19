import { getCustomRepository } from 'typeorm';
import { getCacheConnection } from '../app/loaders/database/cache';
import { OfficeMemberTransformCacheService } from './cache/officeMemberTransform/officeMemberTransform.service';
import { OfficeMemberTransformRepository } from './officeMemberTransform.repository';
import { OfficeMemberTransformService } from './officeMemberTransform.service';

export function createOfficeMemberTransformService() {
	const officeMemberTransformRepository =
		createOfficeMemberTransformRepository();

	const cacheService = createOfficeMemberTransformCache();

	const service = OfficeMemberTransformService(
		officeMemberTransformRepository,
		cacheService
	);

	return service;
}

export function createOfficeMemberTransformRepository() {
	return getCustomRepository(OfficeMemberTransformRepository);
}

export function createOfficeMemberTransformCache() {
	const client = getCacheConnection('officeMemberTransform');
	const cacheService = OfficeMemberTransformCacheService(client);
	return cacheService;
}
