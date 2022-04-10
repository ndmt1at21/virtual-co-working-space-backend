import { EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';
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
}
