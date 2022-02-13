import { EntityRepository, Repository } from 'typeorm';
import { OfficeRole } from '@src/entities/OfficeRole';

@EntityRepository(OfficeRole)
export class OfficeRoleRepository extends Repository<OfficeRole> {}
