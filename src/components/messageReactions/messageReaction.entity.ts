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
export class MessageReaction extends BaseEntity {
	@PrimaryColumn({ name: 'message_id' })
	messageId: number;

	@Column()
	reaction: string;

	@Column({ name: 'actor_id' })
	actorId: number;

	@ManyToOne(type => User, user => user.id)
	actor: User;
}
