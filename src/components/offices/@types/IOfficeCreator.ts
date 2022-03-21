import { Pageable } from '@src/@types/Pageable';
import { Office } from '../office.entity';
import { OfficeDetailDto } from './dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './dto/OfficeOverview.dto';

export interface IOfficeCreator {
	createOfficeOverviewById(id: number): Promise<OfficeOverviewDto>;

	createOfficesOverviewsByIds(ids: number[]): Promise<OfficeOverviewDto[]>;

	createOfficeDetailById(id: number): Promise<OfficeDetailDto>;

	createOfficesOverview(pageable: Pageable): Promise<OfficeOverviewDto[]>;
}
