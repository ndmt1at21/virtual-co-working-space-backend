import { OfficeRepository } from '../offices/office.repository';
import { OfficeInvitationDto } from './@types/dto/OfficeInvitation.dto';
import { IOfficeInvitationCreator } from './@types/IOfficeInvitationCreator';
import { mapOfficeInvitationToOfficeInvitationDto } from './officeInvitation.mapping';
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

		return mapOfficeInvitationToOfficeInvitationDto(officeInvitation!);
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
