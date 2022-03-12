import { EntityRepository } from 'typeorm';
import { ConversationMember } from '@src/components/conversationMembers/conversationMember.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(ConversationMember)
export class ConversationMemberRepository extends BaseRepository<ConversationMember> {}
