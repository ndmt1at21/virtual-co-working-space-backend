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
import { UserMessageStatusType } from '../../@types/UserMessageStatusType';

@Entity({ name: 'user_message_status' })
export class UserMessageStatus extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@PrimaryColumn({ name: 'message_id' })
	messageId: number;

	@PrimaryColumn({ name: 'reader_id' })
	userId: number;

	@Column()
	status: UserMessageStatusType;

	@ManyToOne(type => Message, message => message.id)
	message: Message;

	@ManyToOne(type => User, user => user.id)
	user: User;
}
