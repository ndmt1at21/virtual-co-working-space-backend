import { loadAuthBackgroundJobs } from '@src/components/auth/auth.job';
import { loadInvitationBackgroundJobs } from '@src/components/officeInvitation/officeInvitation.job';

export const loadBackgroundJobs = () => {
	loadAuthBackgroundJobs();
	loadInvitationBackgroundJobs();
};
