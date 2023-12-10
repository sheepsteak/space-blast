import type { Component } from "../ecs/component";

export const GameType = "GAME";

export type Game = {
	hasStarted: boolean;
	level: number;
	lives: number;
	playerDeadCountdown?: number | null;
	score: number;
	totalTime: number;
	type: typeof GameType;
} & Component;

export const createGame = (): Game => ({
	hasStarted: false,
	level: 1,
	lives: 3,
	score: 0,
	totalTime: 0,
	type: GameType,
});
