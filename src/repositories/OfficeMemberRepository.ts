import { EntityRepository, Repository } from 'typeorm';
import { OfficeMember } from '@src/entities/OfficeMember';

@EntityRepository(OfficeMember)
export class OfficeMemberRepository extends Repository<OfficeMember> {}
