import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { System } from "./system";
import {
	createEntity,
	createWorld,
	dispatchWorldEvent,
	subscribe,
	update,
} from "./world";

describe("createEntity", () => {
	it("returns a new empty entity", () => {
		const world = createWorld();

		const entity = createEntity(world);

		assert.strictEqual(entity.id, 0);
		assert.strictEqual(entity.components.size, 0);
	});

	it("increments the world's lastId", () => {
		const world = createWorld();

		createEntity(world);
		createEntity(world);
		createEntity(world);

		assert.strictEqual(world.lastId, 3);
	});

	it("adds the entity to the world's entities", () => {
		const world = createWorld();
		assert.strictEqual(world.entities.length, 0);

		const entity = createEntity(world);

		assert.strictEqual(world.entities.length, 1);
		assert.strictEqual(world.entities[0], entity);
	});
});

describe("dispatchWorldEvent", () => {
	it("appends event to the existing world's events", () => {
		const world = createWorld();
		assert.strictEqual(world.events.length, 0);
		const event = new Event("test");

		dispatchWorldEvent(world, event);

		assert.strictEqual(world.events.length, 1);
	});
});

describe("update", () => {
	it("dispatches all events", () => {
		const world = createWorld();
		const event = new Event("test");
		const listener = new Promise<void>((resolve) => {
			subscribe(world, "test", () => resolve());
		});

		dispatchWorldEvent(world, event);
		assert.strictEqual(world.events.length, 1);

		update(world, 0);

		assert.strictEqual(world.events.length, 0);
		return listener;
	});

	it("keeps any new events dispatched during existing event dispatch", () => {
		const world = createWorld();
		const event1 = new Event("test1");
		const event2 = new Event("test2");
		const listener = new Promise<void>((resolve) => {
			subscribe(world, "test1", () => {
				// Dispatch a new event during the event dispatch
				dispatchWorldEvent(world, event2);
				resolve();
			});
		});

		dispatchWorldEvent(world, event1);
		assert.strictEqual(world.events.length, 1);
		assert.strictEqual(world.events[0], event1);
		update(world, 0);
		assert.strictEqual(world.events.length, 1);
		assert.strictEqual(world.events[0], event2);
		update(world, 0);
		assert.strictEqual(world.events.length, 0);

		return listener;
	});

	it("updates all systems", () => {
		const world = createWorld();
		const executeMock = mock.fn<System["execute"]>((entities, deltaTime) => {
			assert.strictEqual(entities.length, 0);
			assert.strictEqual(deltaTime, 0);
		});
		const system1 = {
			execute: executeMock,
		};
		const system2 = {
			execute: executeMock,
		};

		world.systems.push(system1, system2);
		update(world, 0);

		assert.strictEqual(executeMock.mock.callCount(), 2);
	});
});
