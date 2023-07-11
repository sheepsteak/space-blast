import type { Component } from "../ecs/component";

export const FrictionType = "FRICTION";

export type Friction = {
	value: number;
	type: typeof FrictionType;
} & Component;

export const createFriction = (value: number): Friction => ({
	value,
	type: FrictionType,
});
