import { EntityRepository, Repository } from 'typeorm';
import { Office } from '@src/entities/Office';

@EntityRepository(Office)
export class OfficeRepository extends Repository<Office> {}
