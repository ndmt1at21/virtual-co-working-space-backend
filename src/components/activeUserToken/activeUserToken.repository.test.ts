import { ActiveUserTokenRepository } from './activeUserToken.repository';

describe('ActiveUserTokenRepository', () => {
	let activeUserTokenRepository: ActiveUserTokenRepository;

	beforeEach(() => {
		activeUserTokenRepository = new ActiveUserTokenRepository();
	});

	describe('findByToken', () => {
		it('should build a valid query when pass a valid data', async () => {
			const mockData = {
				token: 'ABC123'
			};

			const fns = {
				where: jest.fn().mockReturnThis(),
				getOne: jest.fn().mockResolvedValue(undefined)
			};

			activeUserTokenRepository.createQueryBuilder = jest
				.fn()
				.mockReturnValueOnce(fns);

			const result = await activeUserTokenRepository.findByToken(
				mockData.token
			);

			expect(
				activeUserTokenRepository.createQueryBuilder
			).toHaveBeenCalledWith('active_user_token');

			expect(fns.where).toBeCalledWith(
				'active_user_token.token = :token',
				{ token: mockData.token }
			);

			expect(fns.getOne).toHaveBeenCalled();
			expect(result).toBeUndefined();
		});
	});

	describe('deleteByToken', () => {
		it('should build a valid query to delete a token', async () => {
			const mockData = {
				token: 'ABC123'
			};

			const fns = {
				where: jest.fn().mockReturnThis(),
				delete: jest.fn().mockReturnThis(),
				execute: jest.fn().mockResolvedValue({
					affected: 1
				})
			};

			activeUserTokenRepository.createQueryBuilder = jest
				.fn()
				.mockReturnValueOnce(fns);

			const result = await activeUserTokenRepository.deleteByToken(
				mockData.token
			);

			expect(
				activeUserTokenRepository.createQueryBuilder
			).toHaveBeenCalledWith('active_user_token');

			expect(fns.where).toBeCalledWith(
				'active_user_token.token = :token',
				{ token: mockData.token }
			);

			expect(fns.delete).toHaveBeenCalled();
			expect(fns.execute).toHaveBeenCalled();
			expect(result).toBe(1);
		});
	});

	describe('findByUserIdAndToken', () => {
		it('should build a valid query to find a token', async () => {
			const mockData = {
				userId: 1,
				token: 'ABC123'
			};

			const fns = {
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getOne: jest.fn().mockResolvedValue(undefined)
			};

			activeUserTokenRepository.createQueryBuilder = jest
				.fn()
				.mockReturnValueOnce(fns);

			const result = await activeUserTokenRepository.findByUserIdAndToken(
				mockData.userId,
				mockData.token
			);

			expect(
				activeUserTokenRepository.createQueryBuilder
			).toHaveBeenCalledWith('active_user_token');

			expect(fns.where).toBeCalledWith(
				'active_user_token.token = :token',
				{ token: mockData.token }
			);

			expect(fns.andWhere).toBeCalledWith(
				'active_user_token.user_id = :userId',
				{ userId: mockData.userId }
			);

			expect(fns.getOne).toHaveBeenCalled();
			expect(result).toBeUndefined();
		});
	});
});
