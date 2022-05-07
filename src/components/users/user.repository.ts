import { EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';
import { FindAllOptions } from '../base/@types/FindAllOptions';
import { FindAllUsersOptions } from './@types/filter/FindAllUsersOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { UserLoginProvider } from '../UserLoginProvider';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
	async findUserByEmail(email: string): Promise<User | undefined> {
		return await this.findOne({
			where: {
				email
			}
		});
	}

	async findUserByExternalId(
		externalId: string,
		provider: UserLoginProvider
	): Promise<User | undefined> {
		return await this.findOne({
			where: {
				externalId,
				provider
			}
		});
	}

	async existsUserById(id: number): Promise<boolean> {
		const count = await this.count({
			where: {
				id
			}
		});

		return count === 1;
	}

	async existsUserByEmail(email: string): Promise<boolean> {
		const count = await this.count({
			where: {
				email
			}
		});

		return count === 1;
	}

	async updatePasswordByUserId(userId: number, password: string) {
		await this.update(
			{ id: userId },
			{
				password
			}
		);
	}

	async findAllUsers(
		options: FindAllUsersOptions
	): Promise<[User[], PaginationInfo]> {
		const optionsWithDbFields =
			this.mapFindAllItemsOptionsToDatabaseField(options);

		return await this.findAll(optionsWithDbFields);
	}

	mapFindAllItemsOptionsToDatabaseField(
		options: FindAllUsersOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;

		return {
			filter: {
				name: filter?.name,
				email: filter?.email,
				phone: filter?.phone,
				provider: filter?.provider,
				type: filter?.type,
				status: filter?.status,
				blocked: filter?.blocked
			},
			sort: {
				name: sort?.name,
				email: sort?.email,
				phone: sort?.phone,
				provider: sort?.provider,
				type: sort?.type,
				status: sort?.status,
				created_at: sort?.createdAt
			},
			paginate: pageable
		};
	}
}
