import { EntityRepository } from 'typeorm';
import { CheckIn } from '@src/entities/CheckIn';
import { BaseRepository } from './BaseRepository';

@EntityRepository(CheckIn)
export class CheckInRepository extends BaseRepository<CheckIn> {}
