import { getCustomRepository } from 'typeorm';
import { OfficeMemberTransformRepository } from './officeMemberTransform.repository';

export function createOfficeMemberTransformRepository() {
	return getCustomRepository(OfficeMemberTransformRepository);
}
