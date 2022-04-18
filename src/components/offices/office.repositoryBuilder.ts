import { FindAllOptions, Pageable } from '../base/@types/FindAllOptions';
import { RepositoryQueryBuilder } from '../base/RepositoryQueryBuilder';
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
		const optionsWithDbField =
			this.mapFindAllItemsOptionsToDatabaseField(options);

		this.query =
			this.repository.createFindAllQueryBuilder(optionsWithDbField);

		return this;
	}

	withCreator(): OfficeRepositoryQueryBuilder {
		this.query.leftJoinAndSelect(`${this.tableAlias}.createdBy`, 'user');
		return this;
	}

	private mapFindAllItemsOptionsToDatabaseField(
		options: FindAllOfficesOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;
		const alias = this.tableAlias;

		return {
			filter: {
				[`${alias}.name`]: filter?.name,
				[`${alias}.invitation_code`]: filter?.invitationCode,
				[`${alias}.created_by_user_id`]: filter?.createdBy,
				[`${alias}.office_item`]: filter?.officeItem,
				[`${alias}.office_member`]: filter?.officeMember,
				[`${alias}.created_at`]: filter?.createdAt
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
