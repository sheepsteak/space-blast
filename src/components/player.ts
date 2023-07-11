import type { Component } from "../ecs/component";

export const PlayerType = "PLAYER";

export type Player = {
	type: typeof PlayerType;
} & Component;

export const createPlayer = (): Player => ({
	type: PlayerType,
});
