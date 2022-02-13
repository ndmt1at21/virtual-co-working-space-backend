import { EntityRepository, Repository } from 'typeorm';
import { Item } from '@src/entities/Item';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {}
