import { describe, expect, it } from "vitest";
import { createRectangle, intersects } from "./rectangle";

describe("intersects", () => {
	it("returns true if rectangles intersect", () => {
		const a = createRectangle(0, 0, 10, 10);
		const b = createRectangle(5, 5, 10, 10);

		const result = intersects(a, b);

		expect(result).toBe(true);
	});

	it("returns false if rectangles do not intersect", () => {
		const a = createRectangle(0, 0, 10, 10);
		const b = createRectangle(11, 11, 10, 10);

		const result = intersects(a, b);

		expect(result).toBe(false);
	});
});
