import type { Entity } from "./entity";

export interface System {
	execute: (entities: Entity[], deltaTime: number) => void;
}
