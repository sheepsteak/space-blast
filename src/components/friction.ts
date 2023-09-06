import type { Component } from "../ecs/component";

export const FrictionType = "FRICTION";

export type Friction = {
	type: typeof FrictionType;
	value: number;
} & Component;

export const createFriction = (value: number): Friction => ({
	type: FrictionType,
	value,
});
