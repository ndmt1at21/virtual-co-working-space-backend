import { loadAuthMailQueue } from './mail';

export const loadBackgroundJobs = () => {
	loadAuthMailQueue();
};
