import Bull from 'bull';

export const officeMemberPositionQueue = new Bull('office_member_queue', {
	redis: { port: 6382, host: 'localhost' }
});
