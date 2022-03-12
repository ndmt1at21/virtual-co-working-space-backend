import { EntityRepository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { BaseRepository } from '../base/BaseRepository';

@EntityRepository(Conversation)
export class ConversationRepository extends BaseRepository<Conversation> {}
