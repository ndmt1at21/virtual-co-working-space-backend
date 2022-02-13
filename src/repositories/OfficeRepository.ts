import { EntityRepository } from 'typeorm';
import { Office } from '@src/entities/Office';
import { BaseRepository } from './BaseRepository';

@EntityRepository(Office)
export class OfficeRepository extends BaseRepository<Office> {}
