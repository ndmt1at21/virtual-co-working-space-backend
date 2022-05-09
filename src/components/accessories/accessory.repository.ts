import { EntityRepository } from 'typeorm';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { BaseRepository } from '../base/BaseRepository';
import { FindAllAccessoriesOptions } from './@types/filter/FindAllAccessoriesOptions';
import { Accessory } from './accessory.entity';

@EntityRepository(Accessory)
export class AccessoryRepository extends BaseRepository<Accessory> {
	async findAccessoryById(id: number) {
		return await this.createQueryBuilder('accessory')
			.leftJoinAndSelect('accessory.category', 'category')
			.where('accessory.id = :id', { id })
			.getOne();
	}

	// async findAccessories(
	// 	options: FindAllAccessoriesOptions
	// ): Promise<[Accessory[], PaginationInfo]> {
    //     const query = this.createQueryBuilder('accessory');

	// 	if (options.filter) {
    //         const filter = options.filter;

    //         if (filter.name) {
    //             query.andWhere('accessory.name LIKE :name', {

    //         }
    //     }
	// }
}
