import type { Vector2 } from "./core/vector2";
import { createVector2 } from "./core/vector2";

export const getScale = (ctx: CanvasRenderingContext2D): Vector2 => {
	const matrix = ctx.getTransform();

	const scaleX = matrix.a;
	const scaleY = matrix.d;

	return createVector2(scaleX, scaleY);
};

export const setupContext = (
	ctx: CanvasRenderingContext2D,
	devicePixelRatio: number,
	height: number,
	width: number,
): void => {
	ctx.canvas.width = width * devicePixelRatio;
	ctx.canvas.height = height * devicePixelRatio;
	ctx.scale(devicePixelRatio, devicePixelRatio);
};
