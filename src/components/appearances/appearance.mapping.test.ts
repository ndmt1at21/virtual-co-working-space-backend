import { mapAppearanceToAppearanceDto } from './appearance.mapping';
import { appearanceEntityToAppearanceMapping } from './test/data/controller';

describe('AppearanceMapping', () => {
	describe('mapAppearanceToAppearanceDto', () => {
		test('should mapping from appearance entity to appearance dto', () => {
			const { input, output } = appearanceEntityToAppearanceMapping;
			const result = mapAppearanceToAppearanceDto(input as any);
			expect(result).toMatchObject(output);
		});
	});
});
