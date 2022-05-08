import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { MessageReaction } from './messageReaction.entity';

@EntityRepository(MessageReaction)
export class MessageReactionRepository extends BaseRepository<MessageReaction> {}
