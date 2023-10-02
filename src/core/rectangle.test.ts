import assert from "node:assert";
import { describe, it } from "node:test";
import { createRectangle, intersects } from "./rectangle";

describe("intersects", () => {
	it("returns true if rectangles intersect", () => {
		const a = createRectangle(0, 0, 10, 10);
		const b = createRectangle(5, 5, 10, 10);

		assert.ok(intersects(a, b));
	});

	it("returns false if rectangles do not intersect", () => {
		const a = createRectangle(0, 0, 10, 10);
		const b = createRectangle(11, 11, 10, 10);

		assert.ok(!intersects(a, b));
	});
});
