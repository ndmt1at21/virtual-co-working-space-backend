import { Pageable } from '@src/@types/Pageable';
import { Office } from '../office.entity';
import { OfficeDetailDto } from './dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './dto/OfficeOverview.dto';

export interface IOfficeCreator {
	createOfficeOverviewById(id: string): Promise<OfficeOverviewDto>;

	createOfficesOverviewsByIds(ids: string[]): Promise<OfficeOverviewDto[]>;

	createOfficeDetailById(id: string): Promise<OfficeDetailDto>;

	createOfficesOverview(pageable: Pageable): Promise<OfficeOverviewDto[]>;
}
