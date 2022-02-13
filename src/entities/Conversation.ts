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

	@Column({ name: 'office_id' })
	officeId: number;

	@OneToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;
}
