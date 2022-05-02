import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '@components/base/BaseEntity';
import { User } from '../../../users/user.entity';
import { Message } from '../../message.entity';

@Entity({ name: 'message_reader' })
export class MessageReader extends BaseEntity {
	@PrimaryColumn({ name: 'message_id' })
	messageId: number;

	@PrimaryColumn({ name: 'reader_id' })
	readerId: number;

	@ManyToOne(type => Message, message => message.id)
	message: Message;

	@ManyToOne(type => User, user => user.id)
	reader: User;
}
