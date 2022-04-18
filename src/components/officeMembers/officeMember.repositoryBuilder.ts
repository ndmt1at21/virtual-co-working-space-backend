import { SelectQueryBuilder } from 'typeorm';
import { RepositoryQueryBuilder } from '../base/RepositoryQueryBuilder';
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
		this.query.where('office_member.office_id = :officeId', { officeId });
		return this;
	}

	findByMemberId(memberId: number): OfficeMemberRepositoryQueryBuilder {
		this.query.where('office_member.member_id = :memberId', {
			memberId
		});
		return this;
	}

	findByMemberIdAndOfficeId(
		memberId: number,
		officeId: number
	): OfficeMemberRepositoryQueryBuilder {
		this.query
			.where('office_member.member_id = :memberId', { memberId })
			.andWhere('office_member.office_id = :officeId', { officeId });
		return this;
	}

	findAll(): OfficeMemberRepositoryQueryBuilder {
		this.query;
		return this;
	}

	withMember(): OfficeMemberRepositoryQueryBuilder {
		this.query.leftJoinAndSelect('office_member.member', 'user');
		return this;
	}

	withOffice(): OfficeMemberRepositoryQueryBuilder {
		this.query.leftJoinAndSelect('office_member.office', 'office');
		return this;
	}

	withOfficeHasCreator(): OfficeMemberRepositoryQueryBuilder {
		this.query
			.leftJoinAndSelect('office_member.office', 'office')
			.leftJoinAndSelect('office.createdBy', 'created_user');
		return this;
	}

	withTransform(): OfficeMemberRepositoryQueryBuilder {
		this.query.leftJoinAndSelect(
			'office_member.transform',
			'office_member_transform'
		);
		return this;
	}

	withRoles(): OfficeMemberRepositoryQueryBuilder {
		this.query
			.leftJoinAndSelect('office_member.roles', 'office_member_role')
			.leftJoinAndSelect('office_member_role.officeRole', 'office_role');
		return this;
	}

	build(): SelectQueryBuilder<OfficeMember> {
		return this.query;
	}
}
