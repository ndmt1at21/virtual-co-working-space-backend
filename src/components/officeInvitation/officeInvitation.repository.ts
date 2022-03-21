import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@components/base/BaseRepository';
import { OfficeInvitation } from './officeInvitation.entity';

@EntityRepository(OfficeInvitation)
export class OfficeInvitationRepository extends BaseRepository<OfficeInvitation> {
	async existsOfficeInvitationTokenExists(token: string): Promise<boolean> {
		const count = await this.createQueryBuilder('office_invitation')
			.where('office_invitation.token = :token', { token: 'token' })
			.getCount();

		return count === 1;
	}

	async findOfficeInvitationByInvitedEmailAndInvitationToken(
		invitedEmail: string,
		token: string
	): Promise<OfficeInvitation | undefined> {
		return await this.createQueryBuilder('office_invitation')
			.where('office_invitation.token = :token', { token: token })
			.andWhere('office_invitation.invited_email = :invitedEmail', {
				invitedEmail: invitedEmail
			})
			.getOne();
	}
}
