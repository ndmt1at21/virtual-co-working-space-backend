import { Queue } from 'bull';
import { UserDto } from '@src/components/users/@types/dto/User.dto';
import { IPushNotificationQueueProducer } from '../@types/IPushNotificationProducer';

export class PushNotificationQueueProducer
	implements IPushNotificationQueueProducer
{
	constructor(private readonly queue: Queue) {}

	addPushNotificationJob(
		user: UserDto,
		activeToken: string,
		clientUrl: string
	) {}
}
