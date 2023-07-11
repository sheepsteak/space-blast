import type { Component } from "../ecs/component";
import type { Vector2 } from "../vector2";

export const PositionType = "POSITION";

export type Position = {
	value: Vector2;
	type: typeof PositionType;
} & Component;

export const createPosition = (value: Vector2): Position => ({
	value,
	type: PositionType,
});
