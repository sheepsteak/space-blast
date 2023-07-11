import type { Component } from "../ecs/component";
import type { InputCommand } from "../input";

export const InputType = "INPUT";

export type Input = {
	commands: InputCommand[];
	type: typeof InputType;
} & Component;

export const createInput = (commands: InputCommand[]): Input => ({
	commands,
	type: InputType,
});
