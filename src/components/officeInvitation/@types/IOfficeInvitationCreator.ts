import { OfficeInvitationDto } from './dto/OfficeInvitation.dto';

export interface IOfficeInvitationCreator {
	createPrivateOfficeInvitationByToken(
		token: string
	): Promise<OfficeInvitationDto>;

	createPublicOfficeInvitation(
		invitationCode: string
	): Promise<OfficeInvitationDto>;
}
