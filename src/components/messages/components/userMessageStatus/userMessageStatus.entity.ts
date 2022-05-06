import {
	Column,
	Entity,
	JoinColumn,
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
	@PrimaryColumn({ name: 'message_id' })
	messageId: number;

	@PrimaryColumn({ name: 'user_id' })
	userId: number;

	@Column({ name: 'is_read', default: false })
	isRead: boolean;

	@Column({ name: 'read_at', nullable: true })
	readAt: Date;

	@Column({ name: 'is_received', default: false })
	isReceived: boolean;

	@Column({ name: 'received_at', nullable: true })
	receivedAt: Date;

	@Column({ name: 'is_self_deleted', default: false })
	isSelfDeleted: boolean;

	@Column({ name: 'self_deleted_at', nullable: true })
	selfDeletedAt: Date;

	@ManyToOne(type => Message)
	@JoinColumn({ name: 'message_id' })
	message: Message;

	@ManyToOne(type => User)
	@JoinColumn({ name: 'user_id' })
	user: User;
}
