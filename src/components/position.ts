import type { Vector2 } from "../core/vector2";
import type { Component } from "../ecs/component";

export const PositionType = "POSITION";

export type Position = {
	value: Vector2;
	type: typeof PositionType;
} & Component;

export const createPosition = (value: Vector2): Position => ({
	value,
	type: PositionType,
});
