import { OfficeInvitationDto } from './@types/dto/OfficeInvitation.dto';
import { OfficeInvitation } from './officeInvitation.entity';

export const mapOfficeInvitationToOfficeInvitationDto = (
	officeInvitation: OfficeInvitation
): OfficeInvitationDto => {
	const { id, invitedEmail, createdByUserId, officeId } = officeInvitation;

	return { id, invitedEmail, inviterId: createdByUserId, officeId };
};
