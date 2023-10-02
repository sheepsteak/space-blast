import assert from "node:assert";
import { describe, it } from "node:test";
import {
	collisionLayer1,
	collisionLayer2,
	collisionLayer3,
	collisionLayer4,
	createCollision,
} from "./collision";

describe("createCollision", () => {
	it("returns a Collision component", () => {
		const collision = createCollision({
			layer: collisionLayer1,
			mask: [collisionLayer2],
		});

		assert.deepStrictEqual(collision, {
			layer: 1,
			mask: 2,
			type: "COLLISION",
		});
	});

	it("returns a Collision component with multiple masks", () => {
		const collision = createCollision({
			layer: collisionLayer1,
			mask: [
				collisionLayer1,
				collisionLayer2,
				collisionLayer3,
				collisionLayer4,
			],
		});

		assert.deepStrictEqual(collision, {
			layer: 1,
			mask: 15,
			type: "COLLISION",
		});
	});
});
