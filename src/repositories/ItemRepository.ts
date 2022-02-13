import { EntityRepository } from 'typeorm';
import { Item } from '@src/entities/Item';
import { BaseRepository } from './BaseRepository';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {}
