import { EntityRepository, Repository } from 'typeorm';
import { ConversationMember } from '@src/entities/ConversationMember';

@EntityRepository(ConversationMember)
export class ConversationMemberRepository extends Repository<ConversationMember> {}
