import { OfficeInvitationDto } from './@types/dto/OfficeInvitation.dto';
import { OfficeInvitation } from './officeInvitation.entity';

export const mapOfficeInvitationToOfficeInvitationDto = (
	officeInvitation: OfficeInvitation
): OfficeInvitationDto => {
	const { id, invitedEmail, createdAt, createdBy, office } = officeInvitation;

	return {
		id: id,
		invitedEmail: invitedEmail,
		inviter: {
			id: createdBy.id,
			email: createdBy.email,
			name: createdBy.name
		},
		token: officeInvitation!.token,
		office: {
			id: office.id,
			name: office.name,
			invitationCode: office.invitationCode,
			createdAt: office.createdAt
		},
		createdAt
	};
};
