import { AuthTrackingDto } from './@types/dto/AuthTracking.dto';
import { AuthTrackingRepository } from './components/authTracking/authTracking.repository';

export class AuthSubscriber {
	constructor(
		private readonly authTrackingRepository: AuthTrackingRepository
	) {}

	listen() {}

	async onLogin(data: AuthTrackingDto): Promise<AuthTrackingDto> {}

	async onLogout(data: AuthTrackingDto): Promise<AuthTrackingDto> {}
}
