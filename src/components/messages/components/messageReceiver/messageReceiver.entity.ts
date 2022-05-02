import {
	Column,
	Entity,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { User } from '../../../users/user.entity';
import { Message } from '../../message.entity';

@Entity({ name: 'message_receiver' })
export class MessageReceiver extends BaseEntity {
	@PrimaryColumn({ name: 'message_id' })
	messageId: number;

	@PrimaryColumn({ name: 'receiver_id' })
	receiverId: number;

	@ManyToOne(type => Message, message => message.id)
	message: Message;

	@ManyToOne(type => User, user => user.id)
	receiver: User;
}
