import { Transform3dDto } from '../officeMembers/@types/dto/Transform3D.dto';
import { OfficeMemberTransform } from './officeMemberTransform.entity';

export const mapOfficeMemberTransformToTransform3D = (
	transform: OfficeMemberTransform
): Transform3dDto => {
	const { xPosition, yPosition, zPosition, xRotation, yRotation, zRotation } =
		transform;

	return {
		position: { x: xPosition, y: yPosition, z: zPosition },
		rotation: { x: xRotation, y: yRotation, z: zRotation }
	};
};
