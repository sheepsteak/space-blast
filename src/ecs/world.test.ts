import { describe, expect, it, vi } from "vitest";
import type { System } from "./system";
import {
  addSystem,
  createEntity,
  createWorld,
  getEntity,
  queueEvent,
  removeEntity,
  subscribe,
  update,
} from "./world";

describe("createEntity", () => {
  it("returns a new empty entity", () => {
    const world = createWorld();

    const entity = createEntity(world);

    expect(entity.id).toBe(0);
    expect(entity.components.size).toBe(0);
    expect(entity.isAlive).toBe(true);
  });

  it("increments the world's lastId", () => {
    const world = createWorld();

    createEntity(world);
    createEntity(world);
    createEntity(world);

    expect(world.lastId).toBe(3);
  });

  it("adds the entity to the world's entities", () => {
    const world = createWorld();
    expect(world.entities.length).toBe(0);

    const entity = createEntity(world);

    expect(world.entities.length).toBe(1);
    expect(world.entities[0]).toEqual(entity);
  });
});

describe("getEntity", () => {
  it("returns the entity with the given id", () => {
    const world = createWorld();
    const entity = createEntity(world);

    const result = getEntity(world, entity.id);

    expect(result).toBe(entity);
  });

  it("returns undefined if no entity with the given id exists", () => {
    const world = createWorld();
    const entity = createEntity(world);

    const result = getEntity(world, entity.id + 1);

    expect(result).toBeUndefined();
  });
});

describe("dispatchWorldEvent", () => {
  it("appends event to the existing world's events", () => {
    const world = createWorld();
    expect(world.entities.length).toBe(0);
    const event = new Event("test");

    queueEvent(world, event);

    expect(world.events).toHaveLength(1);
  });
});

describe("update", () => {
  it("dispatches all events", () => {
    const world = createWorld();
    const event = new Event("test");
    const listener = new Promise<void>((resolve) => {
      subscribe(world, "test", () => resolve());
    });

    queueEvent(world, event);
    expect(world.events).toHaveLength(1);

    update(world, 0);

    expect(world.events).toHaveLength(0);
    return listener;
  });

  it("keeps any new events dispatched during existing event dispatch", () => {
    const world = createWorld();
    const event1 = new Event("test1");
    const event2 = new Event("test2");
    const listener = new Promise<void>((resolve) => {
      subscribe(world, "test1", () => {
        // Dispatch a new event during the event dispatch
        queueEvent(world, event2);
        resolve();
      });
    });

    queueEvent(world, event1);
    expect(world.events).toHaveLength(1);
    expect(world.events[0]).toBe(event1);
    update(world, 0);
    expect(world.events).toHaveLength(1);
    expect(world.events[0]).toBe(event2);
    update(world, 0);
    expect(world.events).toHaveLength(0);

    return listener;
  });

  it("updates all systems", () => {
    expect.assertions(5);
    const world = createWorld();
    const executeMock = vi.fn<Parameters<System["execute"]>>(
      (entities, deltaTime) => {
        expect(entities).toHaveLength(0);
        expect(deltaTime).toBe(0);
      },
    );
    const system1 = {
      execute: executeMock,
    };
    const system2 = {
      execute: executeMock,
    };

    world.systems.push(system1, system2);
    update(world, 0);

    expect(executeMock).toBeCalledTimes(2);
  });

  it("removes entities marked as dead", () => {
    const world = createWorld();
    createEntity(world);
    createEntity(world);
    const system1: System = {
      execute: (entities) => {
        removeEntity(world, entities[1]);
      },
    };
    addSystem(world, system1);

    update(world, 0);

    expect(world.entities).toHaveLength(1);
  });
});
