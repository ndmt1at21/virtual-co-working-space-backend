import { CreateOfficeInvitationDto } from './@types/dto/CreateOfficeInvitation.dto';
import { IOfficeInvitationService } from './@types/IOfficeInvitationService';
import { IOfficeInvitationValidate } from './@types/IOfficeInvitationValidate';
import { OfficeInvitationRepository } from './officeInvitation.repository';

export const OfficeInvitationService = (
	officeInvitationRepository: OfficeInvitationRepository,
	officeInvitationValidate: IOfficeInvitationValidate
): IOfficeInvitationService => {
	const createOfficeInvitationToken = async (
		invitationDto: CreateOfficeInvitationDto
	) => {
		const { inviteEmail, inviterId, officeId } = invitationDto;

		const officeInvitation = await officeInvitationRepository.create({
			officeId,
			createdByUserId: inviterId,
			invitedEmail: inviteEmail
		});

		return officeInvitation.token;
	};

	const acceptInvitationByInvitationToken = async (inviteToken: string) => {};

	const acceptInvitationByOfficeInvitationCode = async (
		inviteCode: string
	) => {};

	const deleteInvitation = async (inviteToken: string) => {};

	return {
		createOfficeInvitationToken,
		acceptInvitationByInvitationToken,
		acceptInvitationByOfficeInvitationCode,
		deleteInvitation
	};
};
