import { EntityRepository } from 'typeorm';
import { OfficeItem } from '@src/entities/OfficeItem';
import { BaseRepository } from '../components/base/BaseRepository';

@EntityRepository(OfficeItem)
export class OfficeItemRepository extends BaseRepository<OfficeItem> {}
