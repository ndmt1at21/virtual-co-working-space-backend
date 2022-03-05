import { EntityRepository } from 'typeorm';
import { Item } from '@src/components/items/item.entity';
import { BaseRepository } from '../base/BaseRepository';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {}
