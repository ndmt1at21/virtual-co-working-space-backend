import { OfficeInvitationDto } from './dto/OfficeInvitation.dto';

export interface IOfficeInvitationMailQueueProducer {
	addPrivateOfficeInviteJob(invitation: OfficeInvitationDto, clientUrl:string): void;
}
