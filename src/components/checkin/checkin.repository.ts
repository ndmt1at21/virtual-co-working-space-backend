import { EntityRepository } from 'typeorm';
import { CheckIn } from '@src/components/checkin/checkin.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(CheckIn)
export class CheckInRepository extends BaseRepository<CheckIn> {}
