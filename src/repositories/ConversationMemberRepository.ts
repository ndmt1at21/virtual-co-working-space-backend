import { EntityRepository } from 'typeorm';
import { ConversationMember } from '@src/entities/ConversationMember';
import { BaseRepository } from './BaseRepository';

@EntityRepository(ConversationMember)
export class ConversationMemberRepository extends BaseRepository<ConversationMember> {}
