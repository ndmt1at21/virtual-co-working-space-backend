import { SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from './BaseRepository';

export class RepositoryQueryBuilder<T> {
	query: SelectQueryBuilder<T>;
	repository: BaseRepository<T>;
	tableAlias: string;

	constructor(repository: BaseRepository<T>) {
		this.repository = repository;
		this.tableAlias = repository.metadata.tableName;
		this.query = repository.createQueryBuilder(this.tableAlias);
	}

	findById(id: number): RepositoryQueryBuilder<T> {
		this.query.where(`${this.tableAlias}.id = :id`, { id });
		return this;
	}

	build(): SelectQueryBuilder<T> {
		return this.query;
	}
}
