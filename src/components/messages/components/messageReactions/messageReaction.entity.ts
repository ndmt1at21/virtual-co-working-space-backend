import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { User } from '../../../users/user.entity';
import { Message } from '../../message.entity';

@Entity({ name: 'message_reaction' })
export class MessageReaction extends BaseEntity {
	@PrimaryColumn({ name: 'message_id' })
	messageId: number;

	@PrimaryColumn({ name: 'actor_id' })
	actorId: number;

	@Column()
	reaction: string;

	@ManyToOne(type => Message, message => message.id)
	message: Message;

	@ManyToOne(type => User, user => user.id)
	actor: User;
}
