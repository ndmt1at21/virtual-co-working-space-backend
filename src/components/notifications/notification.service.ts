import { NotificationObjectRepository } from './components/notificationObject/notificationObject.repository';
import { NotificationRepository } from './notification.repository';

export class NotificationService {
	constructor(
		private readonly notificationRepository: NotificationRepository,
		private readonly notificationObjectRepository: NotificationObjectRepository
	) {}
}
