import { EntityRepository, Repository } from 'typeorm';
import { OfficeRole } from '@src/entities/OfficeRole';
import { BaseRepository } from './BaseRepository';

@EntityRepository(OfficeRole)
export class OfficeRoleRepository extends BaseRepository<OfficeRole> {}
