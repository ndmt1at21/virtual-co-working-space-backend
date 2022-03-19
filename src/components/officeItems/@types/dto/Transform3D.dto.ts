type Position3D = {
	x: number;
	y: number;
	z: number;
};

type Rotation3D = {
	x: number;
	y: number;
	z: number;
};

export type Transform3dDto = {
	rotation: Rotation3D;
	position: Position3D;
};
