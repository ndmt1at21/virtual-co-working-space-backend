import { ActiveTokenErrorMessages } from './activeUserToken.error';

describe('activeUserToken error messages', () => {
	it('should have enough error message properties', () => {
		expect(ActiveTokenErrorMessages).toHaveProperty('INVALID_TOKEN');
	});
});
