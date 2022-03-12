import { EntityRepository } from 'typeorm';
import { OfficeMember } from '@src/components/officeMembers/officeMember.entity';
import { BaseRepository } from '../base/BaseRepository';

@EntityRepository(OfficeMember)
export class OfficeMemberRepository extends BaseRepository<OfficeMember> {}
