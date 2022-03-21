import { createAuthMailWorker } from './auth.factory';

export const loadAuthBackgroundJobs = () => {
	const authMailWorker = createAuthMailWorker();
	authMailWorker.load();
};
