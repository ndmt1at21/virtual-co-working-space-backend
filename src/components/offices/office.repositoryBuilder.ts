import { FindAllOptions, Pageable } from '../base/@types/FindAllOptions';
import { RepositoryQueryBuilder } from '../base/RepositoryQueryBuilder';
import { OfficeMemberStatus } from '../officeMembers/@types/OfficeMemberStatus';
import { FindAllOfficesOptions } from './@types/filter/FindAllOfficesOptions';
import { Office } from './office.entity';
import { OfficeRepository } from './office.repository';

export class OfficeRepositoryQueryBuilder extends RepositoryQueryBuilder<Office> {
	constructor(repository: OfficeRepository) {
		super(repository);
	}

	findById(id: number): OfficeRepositoryQueryBuilder {
		super.findById(id);
		return this;
	}

	findByIds(ids: number[]): OfficeRepositoryQueryBuilder {
		this.query.where(`${this.tableAlias}.id IN (:...ids)`, { ids });

		return this;
	}

	findByInvitationCode(invitationCode: string): OfficeRepositoryQueryBuilder {
		this.query.where(
			`${this.tableAlias}.invitation_code = :invitationCode`,
			{
				invitationCode
			}
		);
		return this;
	}

	findByCreatorId(creatorId: number): OfficeRepositoryQueryBuilder {
		this.query.where(`${this.tableAlias}.created_by_user_id = :creatorId`, {
			creatorId
		});
		return this;
	}

	findAllOffices(
		options: FindAllOfficesOptions
	): OfficeRepositoryQueryBuilder {
		const optionsWithDbField = this.mapFindAllItemsOptionsToDatabaseField(
			this.repository.metadata.tableName,
			options
		);

		this.query = this.repository.createFindAllQueryBuilder(
			this.repository.metadata.tableName,
			optionsWithDbField
		);

		return this;
	}

	findOfficeOverviewsUserIsMemberByUserId(
		userId: number
	): OfficeRepositoryQueryBuilder {
		this.query
			.where('office.is_blocked = :isBlocked', { isBlocked: false })
			.innerJoinAndSelect(
				'office.officeMembers',
				'office_member',
				'(office_member.member_id = :userId AND office_member.status = :status)',
				{
					userId,
					status: OfficeMemberStatus.ACTIVE
				}
			)
			.orderBy('office_member.lastActiveAt', 'DESC');

		return this;
	}

	withCreator(): OfficeRepositoryQueryBuilder {
		this.query.leftJoinAndSelect(`${this.tableAlias}.createdBy`, 'user');
		return this;
	}

	withConversations(): OfficeRepositoryQueryBuilder {
		this.query.leftJoinAndSelect(
			`${this.tableAlias}.conversations`,
			'conversations'
		);

		return this;
	}

	withPageable(pageable: Pageable): OfficeRepositoryQueryBuilder {
		const limit = pageable.limit || 10;
		const page = pageable.page || 1;

		this.query.skip((page - 1) * limit).take(limit);
		return this;
	}

	private mapFindAllItemsOptionsToDatabaseField(
		alias: string,
		options: FindAllOfficesOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;

		return {
			filter: {
				[`${alias}.name`]: filter?.name,
				[`${alias}.invitation_code`]: filter?.invitationCode,
				[`${alias}.created_by_user_id`]: filter?.createdBy,
				[`${alias}.office_item`]: filter?.officeItem,
				[`${alias}.office_member`]: filter?.officeMember,
				[`${alias}.created_at`]: filter?.createdAt,
				[`${alias}.deleted_at`]: filter?.deleted
					? { ne: null }
					: undefined
			},
			sort: {
				[`${alias}.name`]: sort?.name,
				[`${alias}.invitationCode`]: sort?.invitationCode,
				[`${alias}.createdByUserId`]: sort?.createdBy,
				[`${alias}.officeItem`]: sort?.officeItem,
				[`${alias}.officeMember`]: sort?.officeMember,
				[`${alias}.createdAt`]: sort?.createdAt
			},
			paginate: pageable
		};
	}
}
