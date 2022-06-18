import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { IAppearanceService } from './@types/IAppearanceService';
import { AppearanceRepository } from './appearance.repository';
import { AppearanceService } from './appearance.service';

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
		it('should create appearances if create data is valid', async () => {
			appearanceRepository.findAppearanceByKeysAndUserId = jest
				.fn()
				.mockReturnValue(1);

			appearanceRepository.save = jest.fn().mockReturnValue(1);
		});
	});
});
