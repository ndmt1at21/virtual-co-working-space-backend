import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { IAppearanceService } from './@types/IAppearanceService';
import { AppearanceRepository } from './appearance.repository';
import { AppearanceService } from './appearance.service';
import {
	createAppearance,
	findAllAppearancesOfUserData
} from './test/data/service';

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
			// const { input, output, repo } = createAppearance.valid;
			// appearanceRepository.findAppearanceByKeysAndUserId = jest
			// 	.fn()
			// 	.mockReturnValue(repo.appearancesByKeysAndUserId);
			// appearanceRepository.save = jest.fn().mockReturnValue(1);
		});
	});

	describe('findAllAppearancesOfUser', () => {
		it('should create or update appearances if data is valid', async () => {
			// const { input, output, repo } = findAllAppearancesOfUserData.valid;
			// appearanceRepository.findAllAppearancesOfUser = jest
			// 	.fn()
			// 	.mockReturnValue(repo.findAllAppearancesOfUser.appearances);
			// const result = await appearanceService.findAllAppearancesOfUser(
			// 	input.userId
			// );
			// expect(appearanceService.findAllAppearancesOfUser).toBeCalledWith(
			// 	input.userId
			// );
			// expect(result).toMatchObject(output.appearances);
		});
	});

	describe('deleteAppearanceById', () => {
		it('should delete appearance id if appearance exists', async () => {
			// const { input, output, repo } = createAppearance.valid;
			// appearanceRepository.findAppearanceByKeysAndUserId = jest
			// 	.fn()
			// 	.mockReturnValue(repo.appearancesByKeysAndUserId);
			// appearanceRepository.save = jest.fn().mockReturnValue(1);
		});
	});
});
