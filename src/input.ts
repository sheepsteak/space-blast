import type { KeyCode } from "./core/keys";

export type InputCommand = "Thrust" | "TurnLeft" | "TurnRight";

export const mappings: Record<InputCommand, KeyCode> = {
	Thrust: "KeyW",
	TurnLeft: "KeyA",
	TurnRight: "KeyD",
};
