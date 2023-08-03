import type { Vector2 } from "../core/vector2";
import type { Component } from "../ecs/component";

export const VelocityType = "VELOCITY";

export type Velocity = {
	value: Vector2;
	type: typeof VelocityType;
} & Component;

export const createVelocity = (value: Vector2): Velocity => ({
	value,
	type: VelocityType,
});
