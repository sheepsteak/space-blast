import type { Entity } from "./entity";

export type System = {
	execute: (entities: Entity[], deltaTime: number) => void;
};
