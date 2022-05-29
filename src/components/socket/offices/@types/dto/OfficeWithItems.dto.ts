import { OfficeItemOverviewDto } from '@src/components/officeItems/@types/dto/OfficeItemOverviewDto';
import { OfficeOverviewDto } from './OfficeOverview.dto';

export type OfficeWithItemsDto = {
	office: OfficeOverviewDto;
	items: OfficeItemOverviewDto[];
};
