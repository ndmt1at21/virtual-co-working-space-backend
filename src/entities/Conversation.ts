import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Office } from './Office';

@Entity({ name: 'conversation' })
export class Conversation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Office)
	@JoinColumn({ name: 'officeId' })
	office: Office;

	@Column()
	officeId: number;
}
