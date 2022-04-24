import {
	Column,
	Entity,
	Index,
	ManyToOne,
	ObjectID,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { User } from '../users/user.entity';

@Entity({ name: 'conversation' })
export class MessageReader extends BaseEntity {
	@PrimaryColumn({ name: 'message_id' })
	messageId: number;

	@Column({ name: 'reader_id' })
	readerId: number;

	@ManyToOne(type => User, user => user.id)
	reader: User;
}
