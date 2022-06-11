import { DeepPartial, EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { ConversationType } from '../conversations/@types/ConversationType';
import { Conversation } from '../conversations/conversation.entity';
import { OfficeMemberRole } from '../officeMemberRole/officeMemberRole.entity';
import { OfficeMemberStatus } from '../officeMembers/@types/OfficeMemberStatus';
import { OfficeMember } from '../officeMembers/officeMember.entity';
import { OfficeMemberTransform } from '../officeMemberTransform/officeMemberTransform.entity';
import { OfficeRole } from '../officeRoles/officeRole.entity';
import { Office } from './office.entity';
import { OfficeRepositoryQueryBuilder } from './office.repositoryBuilder';

@EntityRepository(Office)
export class OfficeRepository extends BaseRepository<Office> {
	queryBuilder(): OfficeRepositoryQueryBuilder {
		return new OfficeRepositoryQueryBuilder(this);
	}

	async saveOffice(
		entity: DeepPartial<Office>,
		defaultCreatorRoles: OfficeRole[],
		defaultConversationName: string
	): Promise<Office> {
		const office = await this.manager.transaction(
			async transactionEntityManager => {
				const savedOffice = await transactionEntityManager.save(
					Office,
					{
						...entity,
						numberOfMembers: 1
					}
				);

				const createdDefaultConversation =
					await transactionEntityManager.save(Conversation, {
						type: ConversationType.OFFICE_LEVEL,
						officeId: savedOffice.id,
						name: defaultConversationName,
						creatorId: savedOffice.createdByUserId,
						conversationMembers: [
							{ memberId: entity.createdByUserId }
						]
					});

				await transactionEntityManager.save(OfficeMember, {
					officeId: savedOffice.id,
					memberId: savedOffice.createdByUserId,
					roles: defaultCreatorRoles.map(role => ({
						officeRole: role
					})),
					transform: {}
				});

				await transactionEntityManager.update(
					Office,
					{ id: savedOffice.id },
					{
						defaultConversationId: createdDefaultConversation.id
					}
				);

				return {
					...savedOffice,
					defaultConversationId: createdDefaultConversation.id
				};
			}
		);

		return office;
	}

	async existsOfficeByInvitationCode(
		invitationCode: string
	): Promise<boolean> {
		const count = await this.createQueryBuilder('office')
			.where('office.invitationCode = :invitationCode', {
				invitationCode
			})
			.getCount();

		return count === 1;
	}

	async existsOfficeById(id: number): Promise<boolean> {
		const count = await this.createQueryBuilder('office')
			.where('office.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async blockOfficeById(id: number): Promise<boolean> {
		const result = await this.createQueryBuilder('office')
			.update()
			.set({
				isBlocked: true,
				blockedAt: new Date()
			})
			.where('office.id = :id', { id })
			.execute();

		if (result.affected === 0) {
			return false;
		}

		return true;
	}
}
