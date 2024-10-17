import type { KeyCode } from "./core/keys";

export type InputCommand = "Fire" | "Thrust" | "TurnLeft" | "TurnRight";

export const mappings: Record<InputCommand, KeyCode> = {
  Fire: "Space",
  Thrust: "KeyW",
  TurnLeft: "KeyA",
  TurnRight: "KeyD",
};
