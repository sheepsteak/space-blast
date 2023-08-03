import type { Vector2 } from "../core/vector2";
import type { Component } from "../ecs/component";

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
