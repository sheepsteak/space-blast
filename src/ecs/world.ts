import type { Component } from "./component";
import type { Entity } from "./entity";
import type { System } from "./system";

export interface World {
	entities: Entity[];
	lastId: number;
	renderSystems: System[];
	systems: System[];
}

export const createWorld = (): World => ({
	entities: [],
	lastId: 0,
	renderSystems: [],
	systems: [],
});

export const createEntity = (world: World): Entity => {
	const entity = {
		components: new Map<Component["type"], Component>(),
		id: world.lastId++,
	};
	world.entities.push(entity);

	return entity;
};

export const addRenderSystem = (world: World, system: System): World => {
	world.renderSystems.push(system);

	return world;
};

export const addSystem = (world: World, system: System): World => {
	world.systems.push(system);

	return world;
};

export const update = (world: World, deltaTime: number): void => {
	world.systems.forEach((system) => system.execute(world.entities, deltaTime));
};

export const render = (world: World, deltaTime: number): void => {
	world.renderSystems.forEach((renderSystem) =>
		renderSystem.execute(world.entities, deltaTime),
	);
};
