import { OfficeOverviewDto } from '@src/components/offices/@types/dto/OfficeOverview.dto';
import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';
import { Transform3dDto } from './Transform3D.dto';

export class OfficeMemberDetailDto {
	id: string;
	member: UserOverviewDto;
	office: OfficeOverviewDto;
	roles: string[];
	transform: Transform3dDto;
	onlineStatus: string;

	static builder() {
		return new OfficeMemberDetailDtoBuilder();
	}

	constructor(
		id: string,
		member: UserOverviewDto,
		office: OfficeOverviewDto,
		roles: string[],
		transform: Transform3dDto,
		onlineStatus: string
	) {
		this.id = id;
		this.member = member;
		this.office = office;
		this.roles = roles;
		this.transform = transform;
		this.onlineStatus = onlineStatus;
	}
}

class OfficeMemberDetailDtoBuilder {
	id: string;
	member: UserOverviewDto;
	office: OfficeOverviewDto;
	roles: string[];
	transform: Transform3dDto;
	onlineStatus: string;

	constructor() {}

	setMember(member: UserOverviewDto): OfficeMemberDetailDtoBuilder {
		this.member = member;
		return this;
	}

	setOffice(office: OfficeOverviewDto): OfficeMemberDetailDtoBuilder {
		this.office = office;
		return this;
	}

	setTransform(transform: Transform3dDto): OfficeMemberDetailDtoBuilder {
		this.transform = transform;
		return this;
	}

	build(): OfficeMemberDetailDto {
		return new OfficeMemberDetailDto(
			this.id,
			this.member,
			this.office,
			this.roles,
			this.transform,
			this.onlineStatus
		);
	}
}
