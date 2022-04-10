import { Queue } from 'bull';
import { IOfficeInvitationMailQueueProducer } from '../../@types/IOfficeInvitationMailQueueProducer';
import { OfficeInvitationDto } from '../../@types/dto/OfficeInvitation.dto';

export const OfficeInvitationMailQueueProducer = (
	queue: Queue
): IOfficeInvitationMailQueueProducer => {
	const addPrivateOfficeInviteJob = (
		invitation: OfficeInvitationDto,
		clientUrl: string
	) => {
		queue.add('invitation', { invitation, clientUrl });
	};

	return { addPrivateOfficeInviteJob };
};
