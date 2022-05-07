import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { Accessory } from './accessory.entity';

@EntityRepository(Accessory)
export class AccessoryRepository extends BaseRepository<Accessory> {}
