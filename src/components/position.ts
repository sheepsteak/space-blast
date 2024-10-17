import type { Vector2 } from "../core/vector2";
import type { Component } from "../ecs/component";

export const PositionType = "POSITION";

export type Position = {
  type: typeof PositionType;
  value: Vector2;
} & Component;

export const createPosition = (value: Vector2): Position => ({
  type: PositionType,
  value,
});
