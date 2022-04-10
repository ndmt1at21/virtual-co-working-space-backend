import { getCustomRepository } from 'typeorm';
import { AuthTrackingRepository } from './authTracking.repository';
import { AuthTrackingService } from './authTracking.service';

export function createAuthTrackingService() {
	const authTrackingRepository = createAuthTrackingRepository();
	const authTrackingService = AuthTrackingService(authTrackingRepository);
	return authTrackingService;
}

export function createAuthTrackingRepository() {
	return getCustomRepository(AuthTrackingRepository);
}
