import { EntityRepository, Repository } from 'typeorm';
import { Conversation } from '@src/entities/Conversation';

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<Conversation> {}
