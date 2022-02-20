import { EntityRepository, Repository } from 'typeorm';
import { OfficeRole } from '@src/entities/OfficeRole';
import { BaseRepository } from '../components/base/BaseRepository';

@EntityRepository(OfficeRole)
export class OfficeRoleRepository extends BaseRepository<OfficeRole> {}
