import { ObjectID } from 'typeorm';

export type MessageReader = {
	userId: ObjectID;
	readAt: Date;
};
