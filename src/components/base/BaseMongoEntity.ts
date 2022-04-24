import { MongoRepository, ObjectID } from 'typeorm';

type ID = string | number | Date | ObjectID;

export abstract class BaseMongoRepository<T> extends MongoRepository<T> {
	findById(id: ID): Promise<T | undefined> {
		return this.findOne(id);
	}
}
