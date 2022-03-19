import { IOfficeInvitationService } from './@types/IOfficeInvitationService';
import { OfficeInvitationRepository } from './officeInvitation.repository';

export const OfficeInvitationService = (
	officeInvitationRepository: OfficeInvitationRepository
): IOfficeInvitationService => {
	const acceptInvitationByToken = async (inviteToken: string) => {};

	const deleteInvitation = async (inviteToken: string) => {};

	return {};
};
