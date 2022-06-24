describe('AppearanceRepository', () => {
	// let appearanceRepository: AppearanceRepository;

	// beforeEach(() => {
	// 	appearanceRepository = new AppearanceRepository();
	// });

	describe('findAllAppearancesOfUser', () => {
		test('should build a valid query when pass a valid data', async () => {
			// const { input, output } = findAllAppearancesOfUserData.valid;
			// const fns = {
			// 	where: jest.fn().mockReturnThis(),
			// 	getMany: jest.fn().mockResolvedValue(output.appearances)
			// };
			// appearanceRepository.createQueryBuilder = jest
			// 	.fn()
			// 	.mockReturnValueOnce(fns);
			// const result = await appearanceRepository.findAllAppearancesOfUser(
			// 	input.userId
			// );
			// expect(
			// 	appearanceRepository.createQueryBuilder
			// ).toHaveBeenCalledWith('appearance');
			// expect(fns.where).toBeCalledWith('appearance.user_id = :userId', {
			// 	userId: input.userId
			// });
			// expect(fns.getMany).toHaveBeenCalled();
			// expect(result).toMatchObject(output.appearances);
		});
	});
});
