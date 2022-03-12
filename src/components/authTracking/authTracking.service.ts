import { IAuthTrackingService } from './@types/IAuthTrackingService';
import { AuthTrackingRepository } from './authTracking.repository';

export const AuthTrackingService = (
	authTrackingRepository: AuthTrackingRepository
): IAuthTrackingService => {
	const createAuthTracking = async (userId: string): Promise<void> => {
		await authTrackingRepository.create({
			userId
		});
	};

	const updateLastLogin = async (userId: string): Promise<void> => {
		await authTrackingRepository.updateLastLoginByUserId(
			userId,
			new Date()
		);
	};

	const updateLastLogout = async (userId: string): Promise<void> => {
		await authTrackingRepository.updateLastLogoutByUserId(
			userId,
			new Date()
		);
	};

	return { createAuthTracking, updateLastLogin, updateLastLogout };
};
