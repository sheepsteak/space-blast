import type { Component } from "../ecs/component";

export const GameType = "GAME";

export type Game = {
  gameOverCountdown?: number | null;
  level: number;
  lives: number;
  playerDeadCountdown?: number | null;
  score: number;
  state: "playing" | "gameover" | "paused";
  totalTime: number;
  type: typeof GameType;
} & Component;

export const createGame = (): Game => ({
  level: 1,
  lives: 3,
  score: 0,
  state: "playing",
  totalTime: 0,
  type: GameType,
});
