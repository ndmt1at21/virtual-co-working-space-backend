import { mapItemToItemDto } from './item.mapping';
import { itemEntityToItemMapping } from './test/data/mapping';

describe('ItemMapping', () => {
	describe('mapItemToItemDto', () => {
		test('should mapping from item entity to item dto', () => {
			const { input, output } = itemEntityToItemMapping;
			const result = mapItemToItemDto(input as any);
			expect(result).toMatchObject(output);
		});
	});
});
