import { ItemErrorMessages } from './item.error';

describe('ItemErrorMessages', () => {
	it('should have enough error message properties', () => {
		expect(ItemErrorMessages).toHaveProperty('ITEM_NOT_FOUND');
	});
});
