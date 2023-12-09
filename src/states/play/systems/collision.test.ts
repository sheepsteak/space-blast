import { describe, expect, it, vi } from "vitest";
import {
	collisionLayer1,
	collisionLayer2,
	createCollision,
} from "../../../components/collision";
import { createPosition } from "../../../components/position";
import { createSize } from "../../../components/size";
import { vector2Create } from "../../../core/vector2";
import { addEntityComponent } from "../../../ecs/entity";
import {
	createEntity,
	createWorld,
	queueEvent,
	removeEntity,
} from "../../../ecs/world";
import { CollisionEvent } from "../events";
import { createCollisionSystem } from "./collision";

vi.mock("../../../ecs/world", async (importOriginal) => ({
	...(await importOriginal<object>()),
	queueEvent: vi.fn(),
}));

const queueEventMock = vi.mocked(queueEvent);

describe("CollisionSystem", () => {
	it("does not queue a collision event if no entities collide", () => {
		const world = createWorld();
		const entity1 = createEntity(world);
		addEntityComponent(
			entity1,
			createCollision({ layer: collisionLayer1, mask: [collisionLayer2] }),
		);
		addEntityComponent(entity1, createPosition(vector2Create(0, 0)));
		addEntityComponent(entity1, createSize(vector2Create(10, 10)));
		const entity2 = createEntity(world);
		addEntityComponent(
			entity2,
			createCollision({ layer: collisionLayer2, mask: [collisionLayer1] }),
		);
		addEntityComponent(entity2, createPosition(vector2Create(20, 20)));
		addEntityComponent(entity2, createSize(vector2Create(10, 10)));
		const collisionSystem = createCollisionSystem({ world });

		collisionSystem.execute([entity1, entity2], 0);

		expect(queueEventMock).toBeCalledTimes(0);
	});

	it("queues a collision event when two entities collide", () => {
		const world = createWorld();
		const entity1 = createEntity(world);
		addEntityComponent(
			entity1,
			createCollision({ layer: collisionLayer1, mask: [collisionLayer2] }),
		);
		addEntityComponent(entity1, createPosition(vector2Create(0, 0)));
		addEntityComponent(entity1, createSize(vector2Create(10, 10)));
		const entity2 = createEntity(world);
		addEntityComponent(
			entity2,
			createCollision({ layer: collisionLayer2, mask: [collisionLayer1] }),
		);
		addEntityComponent(entity2, createPosition(vector2Create(5, 5)));
		addEntityComponent(entity2, createSize(vector2Create(10, 10)));
		const collisionSystem = createCollisionSystem({ world });

		collisionSystem.execute([entity1, entity2], 0);

		expect(queueEventMock).toBeCalledTimes(1);
		expect(queueEventMock).toBeCalledWith(
			world,
			new CollisionEvent(entity1.id, entity2.id),
		);
	});

	it("does not queue a collision event for dead entities", () => {
		const world = createWorld();
		const entity1 = createEntity(world);
		removeEntity(world, entity1);
		addEntityComponent(
			entity1,
			createCollision({ layer: collisionLayer1, mask: [collisionLayer2] }),
		);
		addEntityComponent(entity1, createPosition(vector2Create(0, 0)));
		addEntityComponent(entity1, createSize(vector2Create(10, 10)));
		const entity2 = createEntity(world);
		addEntityComponent(
			entity2,
			createCollision({ layer: collisionLayer2, mask: [collisionLayer1] }),
		);
		addEntityComponent(entity2, createPosition(vector2Create(5, 5)));
		addEntityComponent(entity2, createSize(vector2Create(10, 10)));
		const collisionSystem = createCollisionSystem({ world });

		collisionSystem.execute([entity1, entity2], 0);

		expect(queueEventMock).toBeCalledTimes(0);
	});
});
