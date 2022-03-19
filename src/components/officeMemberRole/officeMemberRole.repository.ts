import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { OfficeMemberRole } from './officeMemberRole.entity';

@EntityRepository(OfficeMemberRole)
export class OfficeMemberRoleRepository extends BaseRepository<OfficeMemberRole> {}
