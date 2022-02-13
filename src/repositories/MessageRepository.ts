import { EntityRepository, Repository } from 'typeorm';
import { Message } from '@src/entities/Message';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {}
