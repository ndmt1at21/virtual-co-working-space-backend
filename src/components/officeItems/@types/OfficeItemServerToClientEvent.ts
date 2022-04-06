import { OfficeItemOverviewDto } from './dto/OfficeItemOverviewDto';
import { UpdateOfficeItemTransformDto } from './dto/UpdateOfficeItemTransform.dto';

export interface OfficeItemServerToClientEvent {
	'office_item:error': (err: any) => void;

	'office_item:created': (transform: OfficeItemOverviewDto) => void;

	'office_item:moved': (data: UpdateOfficeItemTransformDto) => void;

	'office_item:deleted': (message: string) => void;
}
