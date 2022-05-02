import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { MessageReceiver } from './messageReceiver.entity';

@EntityRepository(MessageReceiver)
export class MessageReceiverRepository extends BaseRepository<MessageReceiver> {}
