import type { Component } from "../ecs/component";

export type AsteroidSize = "SMALL" | "MEDIUM" | "LARGE";
export const AsteroidType = "ASTEROID";

export type Asteroid = {
  size: AsteroidSize;
  type: typeof AsteroidType;
} & Component;

export type CreateAsteroidArgs = {
  size: AsteroidSize;
};

export const createAsteroid = (args: CreateAsteroidArgs): Asteroid => ({
  size: args.size,
  type: AsteroidType,
});
