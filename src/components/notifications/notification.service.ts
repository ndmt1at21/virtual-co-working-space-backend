import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { DeepPartial } from 'typeorm';
import { CreateNotificationDto } from './@types/CreateNotification.dto';
import { NotificationDto } from './@types/Notification.dto';
import { NotificationObjectDto } from './@types/NotificationObject.dto';
import { EntityTypeRepository } from './components/entityType/entityType.repository';
import { NotificationObject } from './components/notificationObject/notificationObject.entity';
import { NotificationObjectRepository } from './components/notificationObject/notificationObject.repository';
import { NotificationDataOfEntityGenerator } from './notification.dataGenerator';
import { Notification } from './notification.entity';
import {
	mapNotificationObjectToNotificationObjectDto,
	mapNotificationToNotificationDto
} from './notification.mapping';
import { NotificationRepository } from './notification.repository';

export class NotificationService {
	constructor(
		private readonly notificationRepository: NotificationRepository,
		private readonly entityTypeRepository: EntityTypeRepository,
		private readonly notificationObjectRepository: NotificationObjectRepository,
		private readonly notificationDataOfEntityGenerator: NotificationDataOfEntityGenerator
	) {}

	async createNotification(
		createNotificationDto: CreateNotificationDto
	): Promise<NotificationObjectDto> {
		const { actorId, entity, notifierIds } = createNotificationDto;

		if (notifierIds.length === 0) {
			throw new IllegalArgumentError('notifier_ids_cannot_be_empty');
		}

		const entityType = await this.entityTypeRepository.findByNameAndAction(
			entity.type,
			entity.action
		);

		if (!entityType) {
			throw new IllegalArgumentError('entity_type_not_found');
		}

		const notificationObject = await this.notificationObjectRepository.save(
			{
				actorId,
				entityTypeId: entityType.id,
				entityId: entity.entityId
			}
		);

		await this.notificationRepository.save(
			notifierIds.map(
				(notifierId): DeepPartial<Notification> => ({
					notifierId: notifierId,
					notificationObjectId: notificationObject.id
				})
			)
		);

		return await this.findNotificationObjectById(notificationObject.id);
	}

	async findNotificationsByUserId(
		userId: number
	): Promise<NotificationDto[]> {
		const notifications =
			await this.notificationRepository.findRecentNotificationsByNotifierId(
				userId
			);

		const notificationWithEntityDataPromises = notifications.map(
			async notification => {
				const dataOfEntity =
					await this.notificationDataOfEntityGenerator.generateEntityData(
						notification.notificationObject
					);

				notification.notificationObject.dataOfEntity = dataOfEntity;

				return notification;
			}
		);

		const notificationsWithEntityData = await Promise.all(
			notificationWithEntityDataPromises
		);

		const notificationsDto = notificationsWithEntityData.map(notification =>
			mapNotificationToNotificationDto(notification)
		);

		return notificationsDto;
	}

	async findNotificationObjectById(
		id: number
	): Promise<NotificationObjectDto> {
		const notificationObject =
			await this.notificationObjectRepository.findNotificationObjectById(
				id
			);

		if (!notificationObject) {
			throw new NotFoundError('notification_object_not_found');
		}

		const dataOfEntity =
			await this.notificationDataOfEntityGenerator.generateEntityData(
				notificationObject
			);

		notificationObject.dataOfEntity = dataOfEntity;

		return mapNotificationObjectToNotificationObjectDto(notificationObject);
	}
}
