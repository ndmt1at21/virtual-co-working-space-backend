import { CreatePrivateInvitationDto } from './dto/CreatePrivateInvitation.dto';
import { OfficeInvitationDto } from './dto/OfficeInvitation.dto';

export interface IOfficeInvitationService {
	createPrivateInvitation(
		createInvitationDto: CreatePrivateInvitationDto
	): Promise<OfficeInvitationDto>;

	findPrivateInvitation(
		userId: number,
		token: string
	): Promise<OfficeInvitationDto>;

	findPublicInvitation(
		userId: number,
		inviteCode: string
	): Promise<OfficeInvitationDto>;

	acceptPrivateInvitation(userId: number, inviteToken: string): Promise<void>;

	acceptPublicInvitation(userId: number, inviteCode: string): Promise<void>;

	deleteInvitation(inviteToken: string): Promise<void>;
}
