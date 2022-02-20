import { EntityRepository } from 'typeorm';
import { CheckIn } from '@src/entities/CheckIn';
import { BaseRepository } from '../components/base/BaseRepository';

@EntityRepository(CheckIn)
export class CheckInRepository extends BaseRepository<CheckIn> {}
