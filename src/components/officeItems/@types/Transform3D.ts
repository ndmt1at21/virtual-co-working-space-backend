import { Position3D } from './Position3D';
import { Rotation3D } from './Rotation3D';

export type Transform3D = {
	rotation: Rotation3D;
	position: Position3D;
};
