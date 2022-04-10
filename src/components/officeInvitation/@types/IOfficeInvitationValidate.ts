import { CreatePrivateInvitationDto } from './dto/CreatePrivateInvitation.dto';

export interface IOfficeInvitationValidate {
	checkCreatePrivateInvitation(
		invitationDto: CreatePrivateInvitationDto
	): Promise<void>;

	checkUserCanJoinByPrivateInvitation(
		userId: number,
		token: string
	): Promise<void>;

	checkUserCanJoinByPublicInvitation(
		userId: number,
		inviteCode: string
	): Promise<void>;
}
