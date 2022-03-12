import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { Office } from './office.entity';

@EntityRepository(Office)
export class OfficeRepository extends BaseRepository<Office> {}
