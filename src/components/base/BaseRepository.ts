import { ObjectID, Repository } from 'typeorm';

type ID = string | number | Date | ObjectID;

export abstract class BaseRepository<T> extends Repository<T> {
	findById(id: ID): Promise<T | undefined> {
		return this.findOne(id);
	}
}
