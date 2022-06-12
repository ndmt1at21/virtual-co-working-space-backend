import { MessageRepository } from '../messages/message.repository';
import { OfficeRepository } from '../offices/office.repository';
import { EntityTypeName } from './@types/EntityTypeName';
import { NotificationObject } from './components/notificationObject/notificationObject.entity';

export class NotificationDataOfEntityGenerator {
	constructor(
		private readonly messageRepository: MessageRepository,
		private readonly officeRepository: OfficeRepository
	) {}

	async generateEntityData(
		notificationObject: NotificationObject
	): Promise<any> {
		const entityTypeName = notificationObject.entityType.name;
		const entityId = notificationObject.entityId;

		if (entityTypeName === EntityTypeName.OFFICE) {
			return this.generateOfficeData(entityId);
		}

		if (entityTypeName === EntityTypeName.MESSAGE) {
			return this.generateMessageData(entityId);
		}
	}

	async generateOfficeData(officeId: number): Promise<any> {
		const office = await this.officeRepository.findById(officeId);

		if (!office) return null;

		return {
			id: office.id,
			name: office.name
		};
	}

	async generateMessageData(messageId: number): Promise<any> {
		const message =
			await this.messageRepository.findMessageWithConversationById(
				messageId
			);

		if (!message) return null;

		return {
			id: message.id,
			content: message.content,
			type: message.type,
			conversation: {
				id: message.conversation.id,
				name: message.conversation.name,
				type: message.conversation.type
			}
		};
	}
}
