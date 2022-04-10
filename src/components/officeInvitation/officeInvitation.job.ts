import { createOfficeInvitationMailWorker } from './officeInvitation.factory';

export const loadInvitationBackgroundJobs = () => {
	const officeInvitationMailWorker = createOfficeInvitationMailWorker();
	officeInvitationMailWorker.load();
};
