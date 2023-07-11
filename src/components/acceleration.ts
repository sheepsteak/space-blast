import type { Component } from "../ecs/component";
import type { Vector2 } from "../vector2";

export const AccelerationType = "ACCELERATION";

export type Acceleration = {
	value: Vector2;
	type: typeof AccelerationType;
} & Component;

export const createAcceleration = (
	value: Vector2 = { x: 0, y: 0 },
): Acceleration => ({
	value,
	type: AccelerationType,
});
