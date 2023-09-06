import type { Vector2 } from "../core/vector2";
import type { Component } from "../ecs/component";

export const VelocityType = "VELOCITY";

export type Velocity = {
	type: typeof VelocityType;
	value: Vector2;
} & Component;

export const createVelocity = (value: Vector2): Velocity => ({
	type: VelocityType,
	value,
});
