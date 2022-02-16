import { EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
	checkExistUserByEmail = async (email: string): Promise<boolean> => {
		const user = await this.findOne({
			where: {
				email
			}
		});

		return user !== undefined;
	};
}
