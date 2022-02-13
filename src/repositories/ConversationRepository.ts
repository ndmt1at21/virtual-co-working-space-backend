import { EntityRepository } from 'typeorm';
import { Conversation } from '@src/entities/Conversation';
import { BaseRepository } from './BaseRepository';

@EntityRepository(Conversation)
export class ConversationRepository extends BaseRepository<Conversation> {}
