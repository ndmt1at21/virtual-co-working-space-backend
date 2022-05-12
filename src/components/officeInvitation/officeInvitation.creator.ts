import { OfficeRepository } from '../offices/office.repository';
import { OfficeInvitationDto } from './@types/dto/OfficeInvitation.dto';
import { IOfficeInvitationCreator } from './@types/IOfficeInvitationCreator';
import { OfficeInvitationRepository } from './officeInvitation.repository';

export class OfficeInvitationCreator implements IOfficeInvitationCreator {
	constructor(
		private readonly officeInvitationRepository: OfficeInvitationRepository,
		private readonly officeRepository: OfficeRepository
	) {}

	createPrivateOfficeInvitationByToken = async (
		token: string
	): Promise<OfficeInvitationDto> => {
		const officeInvitation = await this.officeInvitationRepository
			.createQueryBuilder('office_invitation')
			.where('office_invitation.token = :token', { token })
			.leftJoinAndSelect('office_invitation.office', 'office')
			.leftJoinAndSelect('office_invitation.createdBy', 'user')
			.getOne();

		const { office, createdBy, invitedEmail } = officeInvitation!;

		return {
			id: officeInvitation!.id,
			inviter: {
				id: createdBy.id,
				email: createdBy.email,
				name: createdBy.name
			},
			invitedEmail,
			token: officeInvitation!.token,
			office: {
				id: office.id,
				name: office.name,
				invitationCode: office.invitationCode,
				createdAt: office.createdAt
			}
		};
	};

	createPublicOfficeInvitation = async (
		invitationCode: string
	): Promise<OfficeInvitationDto> => {
		const office = await this.officeRepository
			.queryBuilder()
			.findByInvitationCode(invitationCode)
			.build()
			.getOne();

		const { id, createdAt, name } = office!;

		return {
			office: {
				id,
				invitationCode,
				name,
				createdAt
			}
		};
	};
}
