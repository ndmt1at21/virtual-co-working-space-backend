import { getCustomRepository } from 'typeorm';
import { createMessageRepository } from '../messages/message.factory';
import { createOfficeRepository } from '../offices/office.factory';
import { EntityTypeRepository } from './components/entityType/entityType.repository';
import { NotificationObjectRepository } from './components/notificationObject/notificationObject.repository';
import { NotificationController } from './notification.controller';
import { NotificationDataOfEntityGenerator } from './notification.dataGenerator';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';

export const createNotificationController = () => {
	const notificationService = createNotificationService();

	return new NotificationController(notificationService);
};

export function createNotificationService() {
	const notificationRepository = createNotificationRepository();
	const entityRepository = createEntityTypeRepository();
	const notificationObjectRepository = createNotificationObjectRepository();
	const notificationDataOfEntityGenerator =
		createNotificationDataOfEntityGenerator();

	return new NotificationService(
		notificationRepository,
		entityRepository,
		notificationObjectRepository,
		notificationDataOfEntityGenerator
	);
}

export function createNotificationDataOfEntityGenerator() {
	const messageRepository = createMessageRepository();
	const officeRepository = createOfficeRepository();

	return new NotificationDataOfEntityGenerator(
		messageRepository,
		officeRepository
	);
}

export function createNotificationObjectRepository() {
	return getCustomRepository(NotificationObjectRepository);
}

export function createEntityTypeRepository() {
	return getCustomRepository(EntityTypeRepository);
}

export function createNotificationRepository() {
	return getCustomRepository(NotificationRepository);
}
