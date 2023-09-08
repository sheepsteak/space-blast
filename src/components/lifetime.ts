import type { Component } from "../ecs/component";

export const LifetimeType = "LIFETIME";

export type Lifetime = {
	type: typeof LifetimeType;
	value: number;
} & Component;

export const createLifetime = (value: number): Lifetime => ({
	type: LifetimeType,
	value,
});
