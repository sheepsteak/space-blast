import type { Editable } from "../core/types";
import type { Component } from "./component";
import type { Entity } from "./entity";
import type { System } from "./system";

export type World = {
	entities: Entity[];
	entitiesIDsToRemove: Entity[];
	eventEmitter: EventTarget;
	events: Event[];
	lastId: number;
	renderSystems: System[];
	systems: System[];
};

export type WorldEventListener<TEvent extends Event> = (event: TEvent) => void;

export const createWorld = (): World => ({
	entities: [],
	entitiesIDsToRemove: [],
	eventEmitter: new EventTarget(),
	events: [],
	lastId: 0,
	renderSystems: [],
	systems: [],
});

export const createEntity = (world: World): Entity => {
	const entity: Entity = {
		components: new Map<Component["type"], Component>(),
		id: world.lastId++,
		isAlive: true,
	};
	world.entities.push(entity);

	return entity;
};

export const getEntity = (world: World, id: Entity["id"]): Entity | undefined =>
	world.entities.find((entity) => entity.id === id);

export const removeEntity = (world: World, entity: Entity): void => {
	(entity as Editable<Entity>).isAlive = false;
	world.entitiesIDsToRemove.push(entity);
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
	// Dispatch all events before updating systems
	const events = world.events.slice();
	world.events.length = 0;
	events.forEach((event) => world.eventEmitter.dispatchEvent(event));

	world.systems.forEach((system) => system.execute(world.entities, deltaTime));

	// Remove entities that were marked as dead
	world.entitiesIDsToRemove.forEach((entity) => {
		world.entities.splice(world.entities.indexOf(entity), 1);
	});
	world.entitiesIDsToRemove.length = 0;
};

export const render = (world: World, deltaTime: number): void => {
	world.renderSystems.forEach((renderSystem) =>
		renderSystem.execute(world.entities, deltaTime),
	);
};

export const subscribe = <TEvent extends Event>(
	world: World,
	type: TEvent["type"],
	listener: WorldEventListener<TEvent>,
): void => {
	world.eventEmitter.addEventListener(type, listener as EventListener);
};

export const unsubscribe = <TEvent extends Event>(
	world: World,
	type: TEvent["type"],
	listener: WorldEventListener<TEvent>,
): void => {
	world.eventEmitter.removeEventListener(type, listener as EventListener);
};

export const queueEvent = <TEvent extends Event>(
	world: World,
	event: TEvent,
): void => {
	world.events.push(event);
};
