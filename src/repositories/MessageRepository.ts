import { EntityRepository } from 'typeorm';
import { Message } from '@src/entities/Message';
import { BaseRepository } from './BaseRepository';

@EntityRepository(Message)
export class MessageRepository extends BaseRepository<Message> {}
