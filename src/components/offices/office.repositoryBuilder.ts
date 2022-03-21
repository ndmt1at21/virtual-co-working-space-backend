import { Pageable } from '@src/@types/Pageable';
import { RepositoryQueryBuilder } from '../base/RepositoryQueryBuilder';
import { Office } from './office.entity';
import { OfficeRepository } from './office.repository';

export class OfficeRepositoryQueryBuilder extends RepositoryQueryBuilder<Office> {
	constructor(repository: OfficeRepository) {
		super(repository, 'office');
	}

	findById(id: number): OfficeRepositoryQueryBuilder {
		super.findById(id);
		return this;
	}

	findByIds(ids: number[]): OfficeRepositoryQueryBuilder {
		this.query.where('office.id IN (:...ids)', { ids });
		return this;
	}

	findByInvitationCode(invitationCode: string): OfficeRepositoryQueryBuilder {
		this.query.where('office.invitation_code = :invitationCode', {
			invitationCode
		});
		return this;
	}

	findByCreatorId(creatorId: number): OfficeRepositoryQueryBuilder {
		this.query.where('office.created_by_user_id = :creatorId', {
			creatorId
		});
		return this;
	}

	withCreator(): OfficeRepositoryQueryBuilder {
		this.query.leftJoinAndSelect('office.createdBy', 'user');
		return this;
	}

	withPageable(pageable: Pageable): OfficeRepositoryQueryBuilder {
		super.withPageable(pageable);
		return this;
	}
}
