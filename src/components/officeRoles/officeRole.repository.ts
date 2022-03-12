import { EntityRepository, Repository } from 'typeorm';
import { OfficeRole } from '@src/components/officeRoles/officeRole.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(OfficeRole)
export class OfficeRoleRepository extends BaseRepository<OfficeRole> {}
