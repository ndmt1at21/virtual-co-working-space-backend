import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { AccessoryCategory } from './accessoryCategory.entity';

@EntityRepository(AccessoryCategory)
export class AccessoryCategoryRepository extends BaseRepository<AccessoryCategory> {}
