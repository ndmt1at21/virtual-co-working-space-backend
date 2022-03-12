import Bull from 'bull';

export const createBackupItemPositionQueue = () => {
	return new Bull('update_item_position_queue', {
		redis: {
			host: 'localhost',
			port: 6379
		}
	});
};
