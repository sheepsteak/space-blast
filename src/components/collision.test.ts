import { describe, expect, it } from "@jest/globals";
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

		expect(collision).toMatchInlineSnapshot(`
		{
		  "layer": 1,
		  "mask": 2,
		  "type": "COLLISION",
		}
	`);
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

		expect(collision).toMatchInlineSnapshot(`
		{
		  "layer": 1,
		  "mask": 15,
		  "type": "COLLISION",
		}
	`);
	});
});
