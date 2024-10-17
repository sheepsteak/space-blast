import type { Vector2 } from "../core/vector2";
import type { Component } from "../ecs/component";

export const SizeType = "SIZE";

export type Size = {
  type: typeof SizeType;
  value: Vector2;
} & Component;

export const createSize = (value: Vector2): Size => ({
  type: SizeType,
  value,
});
