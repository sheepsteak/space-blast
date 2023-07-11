import type { Component } from "../ecs/component";

export const RotationType = "ROTATION";

export type Rotation = {
	value: number;
	type: typeof RotationType;
} & Component;

export const createRotation = (value: number): Rotation => ({
	value,
	type: RotationType,
});
