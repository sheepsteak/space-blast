import type { Component } from "../ecs/component";

export const MaxSpeedType = "MAXSPEED";

export type MaxSpeed = {
	type: typeof MaxSpeedType;
	value: number;
} & Component;

export const createMaxSpeed = (value: number): MaxSpeed => ({
	type: MaxSpeedType,
	value,
});
