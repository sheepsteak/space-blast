import type { Component } from "../ecs/component";

export const RotationType = "ROTATION";

export type Rotation = {
	type: typeof RotationType;
	value: number;
} & Component;

export const createRotation = (value: number): Rotation => ({
	type: RotationType,
	value,
});
