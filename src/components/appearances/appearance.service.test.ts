import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { IAppearanceService } from './@types/IAppearanceService';
import { AppearanceRepository } from './appearance.repository';
import { AppearanceService } from './appearance.service';
import { createAppearance } from './test/data/service';

jest.mock('./appearance.repository');

describe('AppearanceService', () => {
	let appearanceService: IAppearanceService;
	let appearanceRepository: AppearanceRepository;
	let officeMemberRepository: OfficeMemberRepository;

	beforeEach(async () => {
		appearanceRepository = new AppearanceRepository();
		officeMemberRepository = new OfficeMemberRepository();
		appearanceService = new AppearanceService(
			appearanceRepository,
			officeMemberRepository
		);
	});

	describe('createAppearance', () => {
		it('should create or update appearances if data is valid', async () => {
			const { input, output, repo } = createAppearance.valid;

			appearanceRepository.findAppearanceByKeysAndUserId = jest
				.fn()
				.mockReturnValue(repo.appearancesByKeysAndUserId);

			appearanceRepository.save = jest.fn().mockReturnValue(1);
		});
	});
});
