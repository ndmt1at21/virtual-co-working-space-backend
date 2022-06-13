import { EntityRepository } from 'typeorm';
import { FindAllOptions } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { BaseRepository } from '../base/BaseRepository';
import { FindAllPushTokensOptions } from './@types/filter/FindAllPushTokensOptions';
import { PushToken } from './pushToken.entity';

@EntityRepository(PushToken)
export class PushTokenRepository extends BaseRepository<PushToken> {
	async findByToken(token: string): Promise<PushToken | undefined> {
		return this.createQueryBuilder('pushToken')
			.where('pushToken.token = :token', { token })
			.getOne();
	}

	async findByTokenAndUserId(
		token: string,
		userId: number
	): Promise<PushToken | undefined> {
		return await this.createQueryBuilder('pushToken')
			.where('pushToken.token = :token', { token })
			.andWhere('pushToken.userId = :userId', { userId })
			.getOne();
	}

	async existsByTokenAndUserId(
		token: string,
		userId: number
	): Promise<boolean> {
		const count = await this.createQueryBuilder('pushToken')
			.where('pushToken.token = :token', { token })
			.andWhere('pushToken.userId = :userId', { userId })
			.getCount();

		return count === 1;
	}

	async findTokensByUserId(userId: number): Promise<PushToken[]> {
		return await this.createQueryBuilder('push_token')
			.where('push_token.userId = :userId', { userId })
			.getMany();
	}

	async softDeletePushTokenByTokenAndUserId(
		pushToken: string,
		userId: number
	): Promise<void> {
		await this.createQueryBuilder('push_token')
			.where('push_token.token = :token', { token: pushToken })
			.andWhere('pushToken.userId = :userId', { userId })
			.softDelete()
			.execute();
	}

	async findAllPushTokens(
		options: FindAllPushTokensOptions
	): Promise<[PushToken[], PaginationInfo]> {
		const optionsWithDbField =
			this.mapFindAllPushTokensOptionsToDatabaseField(
				this.metadata.tableName,
				options
			);

		return await this.findAll(optionsWithDbField);
	}

	mapFindAllPushTokensOptionsToDatabaseField(
		alias: string,
		options: FindAllPushTokensOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;

		return {
			filter: {
				[`${alias}.user_id`]: filter?.userId
			},
			sort: {
				[`${alias}.expired_at`]: sort?.expiredAt
			},
			paginate: pageable
		};
	}
}
