import { AppearanceRepository } from './appearance.repository';
import {
	findAllAppearancesOfUserData,
	findAppearanceByKeysAndUserIdData,
	findAppearancesByUserIdsData
} from './test/data/repository';

describe('AppearanceRepository', () => {
	let appearanceRepository: AppearanceRepository;

	beforeEach(() => {
		appearanceRepository = new AppearanceRepository();
	});

	describe('findAppearancesByUserIds', () => {
		test('should build a valid query when pass a valid data', async () => {
			const { input, output } = findAppearancesByUserIdsData.valid;

			const fns = {
				where: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue(output.appearances)
			};

			appearanceRepository.createQueryBuilder = jest
				.fn()
				.mockReturnValueOnce(fns);

			const result = await appearanceRepository.findAppearancesByUserIds(
				input.userIds
			);

			expect(
				appearanceRepository.createQueryBuilder
			).toHaveBeenCalledWith('appearance');

			expect(fns.where).toBeCalledWith(
				'appearance.userId IN (:...userIds)',
				{ userIds: input.userIds }
			);

			expect(fns.getMany).toHaveBeenCalled();

			expect(result).toMatchObject(output.appearances);
		});
	});

	describe('findAppearanceByKeysAndUserId', () => {
		test('should build a valid query when pass a valid data', async () => {
			const { input, output } = findAppearanceByKeysAndUserIdData.valid;

			const fns = {
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue(output.appearances)
			};

			appearanceRepository.createQueryBuilder = jest
				.fn()
				.mockReturnValueOnce(fns);

			const result =
				await appearanceRepository.findAppearanceByKeysAndUserId(
					input.keys,
					input.userId
				);

			expect(
				appearanceRepository.createQueryBuilder
			).toHaveBeenCalledWith('appearance');

			expect(fns.where).toBeCalledWith('appearance.key IN (:...keys)', {
				keys: input.keys
			});

			expect(fns.andWhere).toBeCalledWith(
				'appearance.user_id = :userId',
				{ userId: input.userId }
			);

			expect(fns.getMany).toHaveBeenCalled();

			expect(result).toMatchObject(output.appearances);
		});
	});

	describe('findAllAppearancesOfUser', () => {
		test('should build a valid query when pass a valid data', async () => {
			const { input, output } = findAllAppearancesOfUserData.valid;

			const fns = {
				where: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue(output.appearances)
			};

			appearanceRepository.createQueryBuilder = jest
				.fn()
				.mockReturnValueOnce(fns);

			const result = await appearanceRepository.findAllAppearancesOfUser(
				input.userId
			);

			expect(
				appearanceRepository.createQueryBuilder
			).toHaveBeenCalledWith('appearance');

			expect(fns.where).toBeCalledWith('appearance.user_id = :userId', {
				userId: input.userId
			});

			expect(fns.getMany).toHaveBeenCalled();

			expect(result).toMatchObject(output.appearances);
		});
	});
});
