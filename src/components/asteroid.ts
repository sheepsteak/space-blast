import type { Component } from "../ecs/component";

export const AsteroidType = "ASTEROID";

export type Asteroid = {
	type: typeof AsteroidType;
} & Component;

export const createAsteroid = (): Asteroid => ({
	type: AsteroidType,
});
