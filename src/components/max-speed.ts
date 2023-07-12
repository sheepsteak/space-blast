import type { Component } from "../ecs/component";

export const MaxSpeedType = "MAXSPEED";

export type MaxSpeed = {
	value: number;
	type: typeof MaxSpeedType;
} & Component;

export const createMaxSpeed = (value: number): MaxSpeed => ({
	value,
	type: MaxSpeedType,
});
