describe('AppearanceReqValidation', () => {
	// let appearanceReqValidation: IAppearanceValidation;

	// beforeAll(() => {
	// 	appearanceReqValidation = new AppearanceReqValidation();
	// });

	describe('validateCreateAppearance', () => {
		test('should throw error if appearances is not an array', async () => {
			// const {
			// 	req: reqData,
			// 	res: resData,
			// 	service: serviceData
			// } = createAppearanceData.valid;
			// const req = { body: reqData.body, user: reqData.user };
			// const res = {
			// 	status: jest.fn().mockReturnThis(),
			// 	json: jest.fn().mockReturnThis()
			// };
			// appearanceService.createAppearance = jest
			// 	.fn()
			// 	.mockImplementation(() => Promise.resolve(serviceData.result));
			// await appearanceController.createAppearance(
			// 	req as Request,
			// 	res as any as Response,
			// 	() => {}
			// );
			// expect(appearanceService.createAppearance).toHaveBeenCalledWith(
			// 	serviceData.arg
			// );
			// expect(res.status).toBeCalledWith(resData.code);
			// expect(res.json).toBeCalledWith(resData);
		});
	});
});
