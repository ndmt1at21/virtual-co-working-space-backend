import {
	CreateOfficeInvitationByEmailDto,
	CreatePublicOfficeInvitationDto
} from './dto/CreateOfficeInvitation.dto';

export interface IOfficeInvitationValidate {
	checkCreateInvitationTokenByEmailData(
		invitationDto: CreateOfficeInvitationByEmailDto
	): Promise<void>;

	checkCreatePublicInvitationTokenData(
		invitationDto: CreatePublicOfficeInvitationDto
	): Promise<void>;

	checkUserCanJoinByInvitationToken(
		invitedEmail: string,
		invitationToken: string
	): Promise<void>;
}
