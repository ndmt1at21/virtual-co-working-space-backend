// export const CallingService = () => {
// 	const createOffice = async (
// 		createdUserId: number,
// 		createOfficeDto: CreateOfficeDto
// 	): Promise<OfficeOverviewDto> => {
// 		const invitationCode = officeInvitationCodeGenerator.generate();
//
// 		const ownerRole = await officeRoleRepository.findOfficeRoleByName(
// 			OfficeRoleType.OWNER
// 		);
//
// 		const officeMember = officeMemberRepository.create({
// 			memberId: createdUserId,
// 			roles: [{ officeRole: ownerRole }],
// 			transform: {}
// 		});
//
// 		const office = await officeRepository.save({
// 			invitationCode,
// 			createdByUserId: createdUserId,
// 			name: createOfficeDto.name,
// 			officeMembers: [officeMember],
// 			numberOfMembers: 1
// 		});
//
// 		const officeDto = await officeCreator.createOfficeOverviewById(
// 			office.id
// 		);
//
// 		return officeDto;
// 	};
//
// 	const updateOfficeById = async (
// 		id: number,
// 		payload: UpdateOfficeDto
// 	): Promise<OfficeOverviewDto> => {
// 		await officeValidate.checkOfficeExistsById(id);
//
// 		await officeRepository.save({
// 			id,
// 			name: payload.name,
// 			avatarUrl: payload.avatar
// 		});
//
// 		return officeCreator.createOfficeOverviewById(id);
// 	};
//
// 	const findOfficeOverviewById = async (
// 		id: number
// 	): Promise<OfficeOverviewDto> => {
// 		await officeValidate.checkOfficeExistsById(id);
// 		const officeOverview = await officeCreator.createOfficeOverviewById(id);
// 		return officeOverview;
// 	};
//
// 	const findOfficeDetailById = async (
// 		id: number
// 	): Promise<OfficeDetailDto> => {
// 		await officeValidate.checkOfficeExistsById(id);
// 		const officeDetail = await officeCreator.createOfficeDetailById(id);
// 		return officeDetail;
// 	};
//
// 	const findAllOfficesOverview = async (
// 		options: FindAllOfficesOptions
// 	): Promise<[OfficeOverviewDto[], PaginationInfo]> => {
// 		return await officeCreator.createOfficesOverview(options);
// 	};
//
// 	const findAllOfficesOverviewUserIsMemberByUserId = async (
// 		userId: number,
// 		pageable: Pageable
// 	): Promise<[OfficeOverviewDto[], number]> => {
// 		const officeMembers = await officeMemberRepository
// 			.queryBuilder()
// 			.findByMemberId(userId)
// 			.build()
// 			.getMany();
//
// 		const totalOfficeMembers = await officeMemberRepository
// 			.queryBuilder()
// 			.findByMemberId(userId)
// 			.build()
// 			.getCount();
//
// 		const offices = await officeCreator.createOfficesOverviewsByIds(
// 			officeMembers.map(om => om.officeId)
// 		);
//
// 		return [offices, totalOfficeMembers];
// 	};
//
// 	const findOfficeItemsById = async (
// 		id: number
// 	): Promise<OfficeWithItemsDto> => {
// 		await officeValidate.checkOfficeExistsById(id);
//
// 		const office = await officeCreator.createOfficeOverviewById(id);
// 		const items =
// 			await officeItemRepository.findOfficeItemsWithItemByOfficeId(id);
//
// 		return {
// 			office,
// 			items: items.map(item => mapOfficeItemToOfficeItemOverviewDto(item))
// 		};
// 	};
//
// 	const findOfficeMembersById = async (
// 		id: number
// 	): Promise<OfficeWithMembersDto> => {
// 		await officeValidate.checkOfficeExistsById(id);
//
// 		const office = await officeCreator.createOfficeOverviewById(id);
// 		const members =
// 			await officeMemberCreator.createOfficeMembersOverviewByOfficeId(id);
//
// 		return {
// 			office,
// 			members
// 		};
// 	};
//
// 	const deleteOfficeById = async (id: number): Promise<void> => {
// 		await officeValidate.checkOfficeExistsById(id);
// 		await officeRepository.softDelete(id);
// 	};
//
// 	return {
// 		createOffice,
// 		findOfficeOverviewById,
// 		findOfficeDetailById,
// 		findAllOfficesOverview,
// 		findAllOfficesOverviewUserIsMemberByUserId,
// 		findOfficeItemsById,
// 		findOfficeMembersById,
// 		updateOfficeById,
// 		deleteOfficeById
// 	};
// };
