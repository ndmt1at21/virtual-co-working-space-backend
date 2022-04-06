import { CreateOfficeItemDto } from './dto/CreateOfficeItem.dto';
import { DeleteOfficeItemDto } from './dto/DeleteOfficeItem.dto';
import { UpdateOfficeItemTransformDto } from './dto/UpdateOfficeItemTransform.dto';

export interface OfficeItemClientToServerEvent {
	'office_item:move': (transform: UpdateOfficeItemTransformDto) => void;

	'office_item:create': (data: CreateOfficeItemDto) => void;

	'office_item:delete': (data: DeleteOfficeItemDto) => void;
}
