import { Pageable } from '@src/@types/Pageable';
import { SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from './BaseRepository';

export class RepositoryQueryBuilder<T> {
	query: SelectQueryBuilder<T>;
	tableAlias: string;

	constructor(repository: BaseRepository<T>, tableAlias: string) {
		this.query = repository.createQueryBuilder(tableAlias);
		this.tableAlias = tableAlias;
	}

	findById(id: number): RepositoryQueryBuilder<T> {
		this.query.where(`${this.tableAlias}.id = :id`, { id });
		return this;
	}

	withPageable(pageable: Pageable): RepositoryQueryBuilder<T> {
		const { page, size } = pageable;

		this.query.limit(size);
		this.query.skip(size * (page - 1));

		return this;
	}

	build(): SelectQueryBuilder<T> {
		return this.query;
	}
}
