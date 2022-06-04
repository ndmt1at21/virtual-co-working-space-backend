import { IActiveUserTokenService } from './@types/IActiveUserTokenService';
import { ActiveUserTokenRepository } from './activeUserToken.repository';
import { ActiveUserTokenService } from './activeUserToken.service';
import crypto from 'crypto';
import { IllegalArgumentError } from '@src/utils/appError';
import { ActiveTokenErrorMessages } from './activeUserToken.error';

jest.mock('./activeUserToken.repository');
jest.mock('crypto');

describe('ActiveUserTokenService', () => {
	let activeUserTokenService: IActiveUserTokenService;
	let activeUserTokenRepository: ActiveUserTokenRepository;

	beforeEach(async () => {
		activeUserTokenRepository = new ActiveUserTokenRepository();
		activeUserTokenService = new ActiveUserTokenService(
			activeUserTokenRepository
		);
	});

	describe('createToken', () => {
		it('should return active token when data is valid', async () => {
			const mockData = {
				userId: 1,
				len: 5,
				token: 'test',
				user: null
			};

			// Mock return value of crypto.randomBytes and activeUserTokenRepository.save
			activeUserTokenRepository.save = jest
				.fn()
				.mockReturnValueOnce(mockData);

			crypto.randomBytes = jest.fn().mockReturnValueOnce(mockData.token);

			const createdToken = await activeUserTokenService.createToken(
				mockData.userId,
				mockData.len
			);

			// Assert that the mock function was called
			expect(crypto.randomBytes).toBeCalledWith(mockData.len);

			expect(activeUserTokenRepository.save).toBeCalledWith({
				userId: mockData.userId,
				token: mockData.token
			});

			expect(createdToken).toMatchObject(mockData);
		});
	});

	describe('deleteToken', () => {
		it('should delete token if token is existed', async () => {
			const mockData = {
				token: 'ABC123'
			};

			activeUserTokenRepository.deleteByToken = jest
				.fn()
				.mockReturnValueOnce(1);

			await activeUserTokenService.deleteToken(mockData.token);

			expect(activeUserTokenRepository.deleteByToken).toBeCalledWith(
				mockData.token
			);
		});

		it('should throw error if token is not existed', async () => {
			const mockData = {
				token: 'ABC123'
			};

			activeUserTokenRepository.deleteByToken = jest
				.fn()
				.mockReturnValueOnce(0);

			await expect(
				activeUserTokenService.deleteToken(mockData.token)
			).rejects.toThrow(IllegalArgumentError);

			expect(activeUserTokenRepository.deleteByToken).toBeCalledWith(
				mockData.token
			);
		});
	});

	describe('validateToken', () => {
		it('should pass validate if token is valid', async () => {});

		it('should throw error if token is invalid', async () => {});
	});
});
