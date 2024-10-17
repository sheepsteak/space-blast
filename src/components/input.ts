import type { Component } from "../ecs/component";
import type { InputCommand } from "../input";

export const InputType = "INPUT";

export type Input = {
  availableCommands: InputCommand[];
  commands: InputCommand[];
  type: typeof InputType;
} & Component;

export const createInput = (availableCommands: InputCommand[]): Input => ({
  availableCommands,
  commands: [],
  type: InputType,
});
