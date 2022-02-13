import { EntityRepository, Repository } from 'typeorm';
import { User } from '@src/entities/User';
import { BaseRepository } from './BaseRepository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
