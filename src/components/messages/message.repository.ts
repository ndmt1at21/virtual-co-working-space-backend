import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends BaseRepository<Message> {}
