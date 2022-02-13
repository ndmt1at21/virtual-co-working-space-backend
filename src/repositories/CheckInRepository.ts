import { EntityRepository, Repository } from 'typeorm';
import { CheckIn } from '@src/entities/CheckIn';

@EntityRepository(CheckIn)
export class CheckInRepository extends Repository<CheckIn> {}
