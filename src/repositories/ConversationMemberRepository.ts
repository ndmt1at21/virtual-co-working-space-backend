import { EntityRepository } from 'typeorm';
import { ConversationMember } from '@src/entities/ConversationMember';
import { BaseRepository } from '../components/base/BaseRepository';

@EntityRepository(ConversationMember)
export class ConversationMemberRepository extends BaseRepository<ConversationMember> {}
