import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';
import { Item } from './Item';
import { Office } from './Office';

@Entity({ name: 'office_item' })
export class OfficeItem extends BaseEntity {
	@PrimaryColumn({ name: 'item_id' })
	itemId: number;

	@PrimaryColumn({ name: 'office_id' })
	officeId: number;

	@Column({ name: 'x_rotation' })
	xRotation: number;

	@Column({ name: 'y_rotation' })
	yRotation: number;

	@Column({ name: 'z_rotation' })
	zRotation: number;

	@Column({ name: 'x_position' })
	xPosition: number;

	@Column({ name: 'y_position' })
	yPosition: number;

	@Column({ name: 'z_position' })
	zPosition: number;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item: Item;

	@ManyToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;
}
