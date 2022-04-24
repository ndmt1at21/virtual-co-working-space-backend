import { EntityRepository } from 'typeorm';
import { BaseMongoRepository } from '../base/BaseMongoEntity';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends BaseMongoRepository<Message> {}
