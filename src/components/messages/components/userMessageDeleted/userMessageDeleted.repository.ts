import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { UserMessageDeleted } from './userMessageDeleted.entity';

@EntityRepository(UserMessageDeleted)
export class UserMessageDeletedRepository extends BaseRepository<UserMessageDeleted> {}
