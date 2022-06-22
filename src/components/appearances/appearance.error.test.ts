import { AppearanceErrorMessages } from './appearance.error';

describe('AppearanceErrorMessages', () => {
	it('should have enough error message properties', () => {
		expect(AppearanceErrorMessages).toHaveProperty('ACCESSORY_NOT_FOUND');
	});
});
