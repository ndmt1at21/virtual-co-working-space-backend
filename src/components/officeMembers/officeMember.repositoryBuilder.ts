import { SelectQueryBuilder } from 'typeorm';
import { FindAllOptions } from '../base/@types/FindAllOptions';
import { RepositoryQueryBuilder } from '../base/RepositoryQueryBuilder';
import { FindAllOfficeMembersOptions } from './@types/filter/FindAllOfficeMembersOptions';
import { OfficeMember } from './officeMember.entity';
import { OfficeMemberRepository } from './officeMember.repository';

export class OfficeMemberRepositoryQueryBuilder extends RepositoryQueryBuilder<OfficeMember> {
	constructor(repository: OfficeMemberRepository) {
		super(repository);
	}

	findById(id: number): OfficeMemberRepositoryQueryBuilder {
		super.findById(id);
		return this;
	}

	findByOfficeId(officeId: number): OfficeMemberRepositoryQueryBuilder {
		this.query.where(`${this.tableAlias}.office_id = :officeId`, {
			officeId
		});
		return this;
	}

	findByMemberId(memberId: number): OfficeMemberRepositoryQueryBuilder {
		this.query.where(`${this.tableAlias}.member_id = :memberId`, {
			memberId
		});
		return this;
	}

	findByMemberIdAndOfficeId(
		memberId: number,
		officeId: number
	): OfficeMemberRepositoryQueryBuilder {
		this.query
			.where(`${this.tableAlias}.member_id = :memberId`, { memberId })
			.andWhere(`${this.tableAlias}.office_id = :officeId`, { officeId });
		return this;
	}

	findAll(): OfficeMemberRepositoryQueryBuilder {
		this.query;
		return this;
	}

	withMember(): OfficeMemberRepositoryQueryBuilder {
		this.query.leftJoinAndSelect(`${this.tableAlias}.member`, 'user');
		return this;
	}

	withOffice(): OfficeMemberRepositoryQueryBuilder {
		this.query.leftJoinAndSelect(`${this.tableAlias}.office`, 'office');
		return this;
	}

	withOfficeHasCreator(): OfficeMemberRepositoryQueryBuilder {
		this.query
			.leftJoinAndSelect(`${this.tableAlias}.office`, 'office')
			.leftJoinAndSelect('office.createdBy', 'created_user');
		return this;
	}

	withTransform(): OfficeMemberRepositoryQueryBuilder {
		this.query.leftJoinAndSelect(
			`${this.tableAlias}.transform`,
			'office_member_transform'
		);
		return this;
	}

	withRoles(): OfficeMemberRepositoryQueryBuilder {
		this.query
			.leftJoinAndSelect(`${this.tableAlias}.roles`, 'office_member_role')
			.leftJoinAndSelect('office_member_role.officeRole', 'office_role');
		return this;
	}

	build(): SelectQueryBuilder<OfficeMember> {
		return this.query;
	}

	private mapFindAllItemsOptionsToDatabaseField(
		options: FindAllOfficeMembersOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;
		const alias = this.tableAlias;

		return {
			filter: {
				[`${alias}.member_id`]: filter?.memberId,
				[`${alias}.office_id`]: filter?.officeId,
				[`${alias}.online_status`]: filter?.onlineStatus,
				[`${alias}.role`]: filter?.role
			},
			sort: {
				[`${alias}.member_id`]: sort?.memberId,
				[`${alias}.office_id`]: sort?.officeId,
				[`${alias}.online_status`]: sort?.onlineStatus,
				[`${alias}.role`]: sort?.role
			},
			paginate: pageable
		};
	}
}
