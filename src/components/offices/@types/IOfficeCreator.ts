import { Pageable } from '@src/components/base/@types/FindAllOptions';
import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { OfficeDetailDto } from './dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './dto/OfficeOverview.dto';
import { FindAllOfficesOptions } from './filter/FindAllOfficesOptions';

export interface IOfficeCreator {
	createOfficeOverviewById(id: number): Promise<OfficeOverviewDto>;

	createOfficeDetailById(id: number): Promise<OfficeDetailDto>;

	createOfficesOverview(
		options: FindAllOfficesOptions
	): Promise<[OfficeOverviewDto[], PaginationInfo]>;
}
