import { EntityRepository, Repository } from 'typeorm';
import { OfficeItem } from '@src/entities/OfficeItem';

@EntityRepository(OfficeItem)
export class OfficeItemRepository extends Repository<OfficeItem> {}
