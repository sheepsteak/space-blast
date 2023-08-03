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
