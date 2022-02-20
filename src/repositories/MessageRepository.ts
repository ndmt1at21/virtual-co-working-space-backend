import { EntityRepository } from 'typeorm';
import { Message } from '@src/entities/Message';
import { BaseRepository } from '../components/base/BaseRepository';

@EntityRepository(Message)
export class MessageRepository extends BaseRepository<Message> {}
