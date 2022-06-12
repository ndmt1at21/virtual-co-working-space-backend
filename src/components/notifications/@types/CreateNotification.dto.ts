import { EntityTypeAction } from './EntityTypeAction';
import { EntityTypeName } from './EntityTypeName';

export type CreateNotificationDto = {
	entity: {
		type: EntityTypeName;
		action: EntityTypeAction;
		entityId: number;
	};
	actorId: number;
	notifierIds: number[];
};
