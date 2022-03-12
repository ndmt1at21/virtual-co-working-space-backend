import { OfficeMemberTransform } from '../officeMemberTransform/officeMemberTransform.entity';
import { OfficeMemberDetailDto } from './@types/dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './@types/dto/OfficeMemberOverview.dto';
import { IOfficeMemberCreator } from './@types/IOfficeMemberCreator';
import { Transform3D } from './@types/Transform3D';
import { OfficeMember } from './officeMember.entity';

export const OfficeMemberCreator = () => {
	const createOfficeMemberOverview = (
		officeMember: OfficeMember,
		transform: OfficeMemberTransform
	): OfficeMemberOverviewDto => {
		const { id, officeId, memberId } = officeMember;

		return {
			id,
			officeId,
			memberId,
			transform: mapOfficeTransformToTransform3D(transform)
		};
	};

	const createOfficeMemberDetail = (
		officeMember: OfficeMember,
		transform: OfficeMemberTransform
	): OfficeMemberDetailDto => {
		const { id, office, member } = officeMember;

		return {
			id,
			office: {
				id: office.id,
				name: office.name,
				invitationCode: office.invitationCode
			},
			member: {
				id: member.id,
				name: member.name
			},
			transform: mapOfficeTransformToTransform3D(transform)
		};
	};

	const createOfficeMembersOverview = (
		officeMembers: OfficeMember[]
	): OfficeMemberOverviewDto[] => {
		return officeMembers.map(officeMember => {
			const { id, officeId, memberId } = officeMember;

			return {
				id,
				officeId,
				memberId,
				transform: mapOfficeTransformToTransform3D(
					{} as OfficeMemberTransform
				)
			};
		});
	};

	function mapOfficeTransformToTransform3D(
		memberTransformDto: OfficeMemberTransform
	): Transform3D {
		const {
			xPosition,
			yPosition,
			zPosition,
			xRotation,
			yRotation,
			zRotation
		} = memberTransformDto;

		return {
			position: { x: xPosition, y: yPosition, z: zPosition },
			rotation: { x: xRotation, y: yRotation, z: zRotation }
		};
	}
	return {
		createOfficeMemberOverview,
		createOfficeMemberDetail,
		createOfficeMembersOverview
	};
};
