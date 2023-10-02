import type { Component } from "../ecs/component";

export const CollisionType = "COLLISION";

export const collisionLayer1 = 1 << 0;
export const collisionLayer2 = 1 << 1;
export const collisionLayer3 = 1 << 2;
export const collisionLayer4 = 1 << 3;

export type Collision = {
	layer: number;
	mask: number;
	type: typeof CollisionType;
} & Component;

export type CreateCollisionArgs = {
	layer: number;
	mask: number[];
};

export const createCollision = ({
	layer,
	mask,
}: CreateCollisionArgs): Collision => ({
	layer,
	mask: mask.reduce((acc, curr) => acc | curr, 0),
	type: CollisionType,
});
