import QueryString from 'qs';
import { BaseEntity } from '../BaseEntity';
import { FindAllOptions } from './FindAllOptions';

export interface IFilterBuilder<T> {
	getMany(): Promise<T[]>;

	getCount(): Promise<number>;

	getManyAndCount(): Promise<[T[], number]>;
}

export interface IFilter {
	filterBuilder<T extends BaseEntity>(): IFilterBuilder<T>;

	extractFilterFromQuery(originalQuery: QueryString.ParsedQs): FindAllOptions;
}
