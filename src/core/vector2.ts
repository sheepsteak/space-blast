export interface Vector2 {
	x: number;
	y: number;
}

export const createVector2 = (x: number, y: number): Vector2 => ({
	x,
	y,
});
