import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';

@Entity({ name: 'message_status' })
export class MessageStatus extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'receiver_id' })
	receiverId: number;

	@Column({ name: 'message_id' })
	messageId: number;

	@Column()
	status: number;
}
