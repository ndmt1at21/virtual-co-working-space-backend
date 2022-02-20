import { EntityRepository } from 'typeorm';
import { MessageState } from '@src/entities/MessageState';
import { BaseRepository } from '../components/base/BaseRepository';

@EntityRepository(MessageState)
export class MessageStateRepository extends BaseRepository<MessageState> {}
