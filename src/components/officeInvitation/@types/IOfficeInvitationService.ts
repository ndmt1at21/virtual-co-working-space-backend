import {
	CreateOfficeInvitationByEmailDto,
	CreatePublicOfficeInvitationDto
} from './dto/CreateOfficeInvitation.dto';
import { OfficeInvitationDto } from './dto/OfficeInvitation.dto';

export interface IOfficeInvitationService {
	createPublicOfficeInvitation(
		invitationDto: CreatePublicOfficeInvitationDto
	): Promise<OfficeInvitationDto>;

	createOfficeInvitationByEmail(
		invitationDto: CreateOfficeInvitationByEmailDto
	): Promise<OfficeInvitationDto>;

	acceptInvitationByInvitationToken(inviteToken: string): Promise<void>;

	deleteInvitation(inviteToken: string): Promise<void>;
}
