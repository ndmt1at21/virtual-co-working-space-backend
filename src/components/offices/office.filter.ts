// import { ParsedQs } from 'qs';
// import { IFilter, IFilterBuilder } from '../base/@types/IFilter';
// import { BaseEntity } from '../base/BaseEntity';
// import { FindAllOfficesOptions } from './@types/filter/FindAllOfficesOptions';
// import { Office } from './office.entity';

// export class OfficeFilter implements IFilter {
// 	filterBuilder<Office>(): IFilterBuilder<Office> {
// 		return new OfficeFilterBuilder();
// 	}

// 	extractFilterFromQuery(originalQuery: ParsedQs): FindAllOfficesOptions {
// 		throw new Error('Method not implemented.');
// 	}
// }

// export class OfficeFilterBuilder implements IFilterBuilder<Office> {
// 	constructor() {}

// 	async getMany() {
// 		return [new Office()];
// 	}

// 	async getCount(): Promise<number> {
// 		return 0;
// 	}

// 	async getManyAndCount(): Promise<[Office[], number]> {
// 		return [[new Office()], 1];
// 	}
// }
