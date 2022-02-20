import { EntityRepository } from 'typeorm';
import { OfficeMember } from '@src/entities/OfficeMember';
import { BaseRepository } from '../components/base/BaseRepository';

@EntityRepository(OfficeMember)
export class OfficeMemberRepository extends BaseRepository<OfficeMember> {}
