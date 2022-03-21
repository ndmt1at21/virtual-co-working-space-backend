import { CreateOfficeInvitationDto } from './dto/CreateOfficeInvitation.dto';

export interface IOfficeInvitationValidate {
	checkCreateInvitationTokenData(
		invitationDto: CreateOfficeInvitationDto
	): Promise<void>;

	checkUserCanJoinByInvitationToken(
		invitedEmail: string,
		invitationToken: string
	): Promise<void>;
}
