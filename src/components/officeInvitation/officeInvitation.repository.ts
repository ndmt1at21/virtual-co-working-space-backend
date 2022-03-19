import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@components/base/BaseRepository';
import { OfficeInvitation } from './officeInvitation.entity';

@EntityRepository(OfficeInvitation)
export class OfficeInvitationRepository extends BaseRepository<OfficeInvitation> {}
