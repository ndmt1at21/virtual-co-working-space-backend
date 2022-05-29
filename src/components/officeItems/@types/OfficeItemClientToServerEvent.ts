import { CreateOfficeItemDto } from './dto/CreateOfficeItem.dto';
import { UpdateOfficeItemTransformDto } from './dto/UpdateOfficeItemTransform.dto';

export interface OfficeItemClientToServerEvent {
	'office_item:move': (data: UpdateOfficeItemTransformDto) => void;

	'office_item:create': (data: CreateOfficeItemDto) => void;

	'office_item:delete': (data: { id: number }) => void;
}
